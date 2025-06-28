import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { searchEngine } from '../utils/searchEngine';
import { dataStore, dataHelpers } from '../utils/dataStore';
import { cache } from '../utils/cache';

const AppContext = createContext();

const initialState = {
  theme: {
    darkMode: localStorage.getItem('darkMode') === 'true' || false
  },
  search: {
    term: '',
    filters: {},
    suggestions: [],
    results: []
  },
  ui: {
    isLoading: false,
    errors: [],
    notifications: []
  },
  data: {
    positions: {
      internships: [],
      nss: []
    },
    lastUpdated: null,
    isInitialized: false
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_DARK_MODE':
      localStorage.setItem('darkMode', action.payload);
      return {
        ...state,
        theme: { ...state.theme, darkMode: action.payload }
      };
    
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        search: { ...state.search, term: action.payload }
      };
    
    case 'SET_FILTERS':
      return {
        ...state,
        search: { ...state.search, filters: action.payload }
      };

    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        search: { ...state.search, results: action.payload }
      };

    case 'SET_SUGGESTIONS':
      return {
        ...state,
        search: { ...state.search, suggestions: action.payload }
      };
    
    case 'SET_POSITIONS':
      return {
        ...state,
        data: {
          ...state.data,
          positions: { ...state.data.positions, [action.positionType]: action.payload },
          lastUpdated: Date.now()
        }
      };

    case 'SET_DATA_INITIALIZED':
      return {
        ...state,
        data: { ...state.data, isInitialized: action.payload }
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.payload }
      };
    
    case 'ADD_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: [...state.ui.errors, { id: Date.now(), message: action.payload, timestamp: Date.now() }]
        }
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: state.ui.errors.filter(error => error.id !== action.payload)
        }
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, { 
            id: Date.now(), 
            message: action.payload.message,
            type: action.payload.type || 'info',
            timestamp: Date.now()
          }]
        }
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(notif => notif.id !== action.payload)
        }
      };
    
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load initial data
  useEffect(() => {
    initializeApp();
  }, []);
  
  const initializeApp = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Check cache first
      const cachedInternships = cache.get('internships');
      const cachedNSS = cache.get('nss-positions');
      
      let internships, nssPositions;
      
      if (cachedInternships && cachedNSS) {
        internships = cachedInternships;
        nssPositions = cachedNSS;
      } else {
        // Load from modules (simulate API call)
        const { jobPostings } = await import('../data/jobs');
        const { jobPostings: nssData } = await import('../data/nssdata');
        
        internships = jobPostings;
        nssPositions = nssData;
        
        // Cache the data
        cache.set('internships', internships, 10 * 60 * 1000); // 10 minutes
        cache.set('nss-positions', nssPositions, 10 * 60 * 1000);
      }
      
      // Initialize data store
      dataHelpers.initializeFromLegacyData(internships, nssPositions);
      
      // Make dataStore globally available for search engine
      window.dataStore = dataStore;
      
      // Initialize search engine
      const allPositions = [
        ...dataHelpers.getPositionsByType('internship'),
        ...dataHelpers.getPositionsByType('nss')
      ];
      searchEngine.buildIndex(allPositions);
      
      dispatch({ type: 'SET_POSITIONS', positionType: 'internships', payload: internships });
      dispatch({ type: 'SET_POSITIONS', positionType: 'nss', payload: nssPositions });
      dispatch({ type: 'SET_DATA_INITIALIZED', payload: true });
      
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { 
          message: 'Data loaded successfully', 
          type: 'success' 
        } 
      });
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
      dispatch({ type: 'ADD_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Custom hooks for specific functionality
export const useTheme = () => {
  const { state, dispatch } = useAppContext();
  
  return {
    darkMode: state.theme.darkMode,
    toggleDarkMode: () => dispatch({ 
      type: 'SET_DARK_MODE', 
      payload: !state.theme.darkMode 
    })
  };
};

export const useSearch = () => {
  const { state, dispatch } = useAppContext();
  
  const performSearch = (term, filters = {}) => {
    const cacheKey = `search:${term}:${JSON.stringify(filters)}`;
    
    // Check cache first
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: cachedResults });
      return cachedResults;
    }
    
    // Perform search
    const resultIds = searchEngine.search(term, filters);
    const results = resultIds.map(id => dataHelpers.getPosition(id)).filter(Boolean);
    
    // Cache results
    cache.set(cacheKey, results, 2 * 60 * 1000); // 2 minutes
    
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    return results;
  };

  const getSuggestions = (term) => {
    if (term.length < 2) {
      dispatch({ type: 'SET_SUGGESTIONS', payload: [] });
      return [];
    }
    
    const suggestions = searchEngine.getSuggestions(term);
    dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions });
    return suggestions;
  };
  
  return {
    searchTerm: state.search.term,
    filters: state.search.filters,
    suggestions: state.search.suggestions,
    results: state.search.results,
    setSearchTerm: (term) => {
      dispatch({ type: 'SET_SEARCH_TERM', payload: term });
      getSuggestions(term);
    },
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    performSearch,
    getSuggestions
  };
};

export const useNotifications = () => {
  const { state, dispatch } = useAppContext();
  
  const addNotification = (message, type = 'info') => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message, type } });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: Date.now() });
    }, 5000);
  };
  
  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };
  
  return {
    notifications: state.ui.notifications,
    addNotification,
    removeNotification
  };
};

export const useErrors = () => {
  const { state, dispatch } = useAppContext();
  
  const addError = (message) => {
    dispatch({ type: 'ADD_ERROR', payload: message });
  };
  
  const removeError = (id) => {
    dispatch({ type: 'REMOVE_ERROR', payload: id });
  };
  
  const clearErrors = () => {
    state.ui.errors.forEach(error => {
      dispatch({ type: 'REMOVE_ERROR', payload: error.id });
    });
  };
  
  return {
    errors: state.ui.errors,
    addError,
    removeError,
    clearErrors
  };
};
