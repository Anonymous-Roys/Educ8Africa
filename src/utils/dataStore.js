// Optimized data store with efficient algorithms and caching
class DataStore {
  constructor() {
    this.cache = new Map();
    this.indexes = new Map(); // For faster lookups
    this.searchIndex = new Map(); // For search optimization
    this.lastUpdated = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Set data with automatic indexing
  setData(key, data, indexFields = []) {
    this.cache.set(key, data);
    this.lastUpdated.set(key, Date.now());
    
    // Create indexes for faster searching
    if (Array.isArray(data) && indexFields.length > 0) {
      this.createIndexes(key, data, indexFields);
      this.createSearchIndex(key, data, indexFields);
    }
    
    return data;
  }

  // Get data with cache validation
  getData(key) {
    const lastUpdate = this.lastUpdated.get(key);
    const isExpired = lastUpdate && (Date.now() - lastUpdate) > this.cacheExpiry;
    
    if (isExpired) {
      this.invalidateCache(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  // Create indexes for O(1) lookups instead of O(n) array searches
  createIndexes(dataKey, data, indexFields) {
    const indexes = {};
    
    indexFields.forEach(field => {
      indexes[field] = new Map();
      data.forEach((item, index) => {
        const value = this.getNestedValue(item, field);
        if (value !== undefined) {
          if (!indexes[field].has(value)) {
            indexes[field].set(value, []);
          }
          indexes[field].get(value).push(index);
        }
      });
    });
    
    this.indexes.set(dataKey, indexes);
  }

  // Create search index for fast text searching
  createSearchIndex(dataKey, data, searchFields) {
    const searchIndex = new Map();
    
    data.forEach((item, index) => {
      const searchText = searchFields
        .map(field => this.getNestedValue(item, field))
        .filter(val => val)
        .join(' ')
        .toLowerCase();
      
      // Create word-based index for faster searching
      const words = searchText.split(/\s+/);
      words.forEach(word => {
        if (word.length > 2) { // Ignore very short words
          if (!searchIndex.has(word)) {
            searchIndex.set(word, new Set());
          }
          searchIndex.get(word).add(index);
        }
      });
    });
    
    this.searchIndex.set(dataKey, searchIndex);
  }

  // Fast search using pre-built indexes
  search(dataKey, query, limit = 10) {
    const data = this.getData(dataKey);
    const searchIndex = this.searchIndex.get(dataKey);
    
    if (!data || !searchIndex || !query) {
      return data?.slice(0, limit) || [];
    }

    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    
    if (queryWords.length === 0) {
      return data.slice(0, limit);
    }

    // Find intersection of all matching documents
    let matchingIndexes = null;
    
    queryWords.forEach(word => {
      const wordMatches = new Set();
      
      // Find all words that start with the query word (prefix matching)
      for (const [indexWord, indexes] of searchIndex) {
        if (indexWord.includes(word)) {
          indexes.forEach(idx => wordMatches.add(idx));
        }
      }
      
      if (matchingIndexes === null) {
        matchingIndexes = wordMatches;
      } else {
        // Intersection for AND search
        matchingIndexes = new Set([...matchingIndexes].filter(x => wordMatches.has(x)));
      }
    });

    if (!matchingIndexes || matchingIndexes.size === 0) {
      return [];
    }

    // Convert indexes back to data and apply limit
    return Array.from(matchingIndexes)
      .slice(0, limit)
      .map(index => data[index])
      .filter(Boolean);
  }

  // Filter data using indexes for O(1) lookup
  filterByField(dataKey, field, value) {
    const data = this.getData(dataKey);
    const indexes = this.indexes.get(dataKey);
    
    if (!data || !indexes || !indexes[field]) {
      return data?.filter(item => this.getNestedValue(item, field) === value) || [];
    }
    
    const matchingIndexes = indexes[field].get(value) || [];
    return matchingIndexes.map(index => data[index]).filter(Boolean);
  }

  // Get nested object values safely
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Pagination with efficient slicing
  paginate(dataKey, page = 1, pageSize = 10, filterFn = null) {
    let data = this.getData(dataKey) || [];
    
    if (filterFn) {
      data = data.filter(filterFn);
    }
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      data: data.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / pageSize),
        hasNext: endIndex < data.length,
        hasPrev: page > 1
      }
    };
  }

  // Sort data efficiently
  sortData(dataKey, sortField, order = 'asc') {
    const data = this.getData(dataKey);
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      const aVal = this.getNestedValue(a, sortField);
      const bVal = this.getNestedValue(b, sortField);
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Cache management
  invalidateCache(key) {
    this.cache.delete(key);
    this.indexes.delete(key);
    this.searchIndex.delete(key);
    this.lastUpdated.delete(key);
  }

  clearAll() {
    this.cache.clear();
    this.indexes.clear();
    this.searchIndex.clear();
    this.lastUpdated.clear();
  }

  // Memory usage optimization
  getMemoryUsage() {
    return {
      cacheSize: this.cache.size,
      indexesSize: this.indexes.size,
      searchIndexSize: this.searchIndex.size
    };
  }
}

// Singleton instance
export const dataStore = new DataStore();
export default DataStore;