import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Vite proxy forwards to backend
  headers: { 'Content-Type': 'application/json' }
});

export const clinicAPI = {
  getPatients: async () => {
    const res = await api.get('/patients');
    return res.data || [];
  },
  addPatient: async data => {
    const res = await api.post('/patients', data);
    return res.data;
  },
  addVisit: async data => {
    const res = await api.post('/visits', data);
    return res.data;
  }
};

export default clinicAPI;
