// Initialize data store with existing data
import { dataHelpers } from '../utils/dataStore';
import { searchEngine } from '../utils/searchEngine';

export const initializeDataStore = async () => {
  try {
    // Import existing data
    const { jobs } = await import('../data/jobs');
    const { jobPostings } = await import('../data/nssdata');
    
    // Initialize data store with legacy data
    dataHelpers.initializeFromLegacyData(jobs, jobPostings);
    
    // Get all positions for search engine
    const allPositions = [
      ...dataHelpers.getPositionsByType('internship'),
      ...dataHelpers.getPositionsByType('nss')
    ];
    
    // Build search index
    searchEngine.buildIndex(allPositions);
    
    console.log(`✅ Data store initialized with ${allPositions.length} positions`);
    console.log('🔍 Search engine index built successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize data store:', error);
    return false;
  }
};

export default initializeDataStore;
