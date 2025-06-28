// Centralized data store with normalized structure
export const dataStore = {
  // Normalized entities
  entities: {
    positions: {
      byId: {},
      allIds: []
    },
    departments: {
      byId: {
        'dept-1': { id: 'dept-1', name: 'Cybersecurity', description: 'Digital security and protection' },
        'dept-2': { id: 'dept-2', name: 'Software Development', description: 'Building digital solutions' },
        'dept-3': { id: 'dept-3', name: 'Data Science', description: 'Analytics and insights' },
        'dept-4': { id: 'dept-4', name: 'Digital Marketing', description: 'Online marketing and engagement' },
        'dept-5': { id: 'dept-5', name: 'Project Management', description: 'Planning and execution' }
      },
      allIds: ['dept-1', 'dept-2', 'dept-3', 'dept-4', 'dept-5']
    },
    locations: {
      byId: {
        'loc-1': { id: 'loc-1', city: 'Accra', country: 'Ghana', region: 'Greater Accra' },
        'loc-2': { id: 'loc-2', city: 'Kumasi', country: 'Ghana', region: 'Ashanti' },
        'loc-3': { id: 'loc-3', city: 'Remote', country: 'Global', region: 'Virtual' }
      },
      allIds: ['loc-1', 'loc-2', 'loc-3']
    },
    companies: {
      byId: {
        'comp-1': { 
          id: 'comp-1', 
          name: 'Educ8Africa', 
          description: 'Leading digital education and cybersecurity company in Africa',
          website: 'https://educ8africa.com'
        }
      },
      allIds: ['comp-1']
    }
  },
  
  // Indexes for fast lookups
  indexes: {
    positionsByType: {
      internship: [],
      nss: []
    },
    positionsByDepartment: {},
    positionsByLocation: {},
    searchIndex: new Map()
  }
};

// Helper functions for data manipulation
export const dataHelpers = {
  // Add a new position
  addPosition: (position) => {
    const id = position.id || `pos-${Date.now()}`;
    const normalizedPosition = { ...position, id };
    
    dataStore.entities.positions.byId[id] = normalizedPosition;
    dataStore.entities.positions.allIds.push(id);
    
    // Update indexes
    dataStore.indexes.positionsByType[position.type].push(id);
    
    if (!dataStore.indexes.positionsByDepartment[position.departmentId]) {
      dataStore.indexes.positionsByDepartment[position.departmentId] = [];
    }
    dataStore.indexes.positionsByDepartment[position.departmentId].push(id);
    
    if (!dataStore.indexes.positionsByLocation[position.locationId]) {
      dataStore.indexes.positionsByLocation[position.locationId] = [];
    }
    dataStore.indexes.positionsByLocation[position.locationId].push(id);
    
    return id;
  },

  // Get position by ID
  getPosition: (id) => {
    return dataStore.entities.positions.byId[id];
  },

  // Get positions by type
  getPositionsByType: (type) => {
    return dataStore.indexes.positionsByType[type]?.map(id => 
      dataStore.entities.positions.byId[id]
    ) || [];
  },

  // Get department info
  getDepartment: (id) => {
    return dataStore.entities.departments.byId[id];
  },

  // Get location info
  getLocation: (id) => {
    return dataStore.entities.locations.byId[id];
  },

  // Get company info
  getCompany: (id) => {
    return dataStore.entities.companies.byId[id];
  },

  // Initialize store with existing data
  initializeFromLegacyData: (jobPostings, nssPostings) => {
    // Clear existing data
    dataStore.entities.positions.byId = {};
    dataStore.entities.positions.allIds = [];
    dataStore.indexes.positionsByType.internship = [];
    dataStore.indexes.positionsByType.nss = [];
    dataStore.indexes.positionsByDepartment = {};
    dataStore.indexes.positionsByLocation = {};

    // Process internship positions
    jobPostings.forEach((job, index) => {
      const position = {
        id: `intern-${index + 1}`,
        title: job.jobTitle,
        type: 'internship',
        departmentId: dataHelpers.findDepartmentId(job.department),
        locationId: dataHelpers.findLocationId(job.location),
        companyId: 'comp-1',
        roleOverview: job.roleOverview,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        benefits: job.benefits,
        applicationDeadline: job.applicationDeadline,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      dataHelpers.addPosition(position);
    });

    // Process NSS positions
    nssPostings.forEach((nss, index) => {
      const position = {
        id: `nss-${index + 1}`,
        title: nss.jobTitle,
        type: 'nss',
        departmentId: dataHelpers.findDepartmentId(nss.department),
        locationId: dataHelpers.findLocationId(nss.location),
        companyId: 'comp-1',
        roleOverview: nss.roleOverview,
        responsibilities: nss.responsibilities,
        qualifications: nss.qualifications,
        benefits: nss.benefits,
        applicationDeadline: nss.applicationDeadline,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      dataHelpers.addPosition(position);
    });
  },

  // Helper to find department ID by name
  findDepartmentId: (departmentName) => {
    const dept = Object.values(dataStore.entities.departments.byId)
      .find(d => d.name.toLowerCase().includes(departmentName.toLowerCase()));
    return dept?.id || 'dept-1'; // Default to cybersecurity
  },

  // Helper to find location ID by name
  findLocationId: (locationName) => {
    if (locationName.toLowerCase().includes('remote')) return 'loc-3';
    if (locationName.toLowerCase().includes('kumasi')) return 'loc-2';
    return 'loc-1'; // Default to Accra
  }
};

export default dataStore;
