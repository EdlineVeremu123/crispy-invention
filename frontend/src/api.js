import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      throw new Error('Server error. Please check if the backend is running.');
    }
    
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please make sure the backend is running on port 3000.');
    }
    
    throw error;
  }
);

// API functions
export const clinicAPI = {
  // Get all patients with their visits
  getPatients: async () => {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch patients: ${error.message}`);
    }
  },

  // Add new patient
  addPatient: async (patientData) => {
    try {
      const { name, age, height } = patientData;
      
      // Validation
      if (!name || !age || !height) {
        throw new Error('All fields (name, age, height) are required');
      }
      
      if (age < 0 || age > 150) {
        throw new Error('Age must be between 0 and 150');
      }
      
      if (height < 0 || height > 300) {
        throw new Error('Height must be between 0 and 300 cm');
      }

      const response = await api.post('/patients', {
        name: name.trim(),
        age: parseInt(age),
        height: parseFloat(height)
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add patient: ${error.message}`);
    }
  },

  // Add visit for a patient
  addVisit: async (visitData) => {
    try {
      const { patient_id, visit_date, observations } = visitData;
      
      // Validation
      if (!patient_id || !visit_date || !observations) {
        throw new Error('All fields (patient_id, visit_date, observations) are required');
      }
      
      if (!observations.trim()) {
        throw new Error('Observations cannot be empty');
      }

      const response = await api.post('/visits', {
        patient_id: parseInt(patient_id),
        visit_date: visit_date,
        observations: observations.trim()
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add visit: ${error.message}`);
    }
  }
};

export default clinicAPI;
