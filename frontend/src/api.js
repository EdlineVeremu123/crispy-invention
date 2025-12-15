import axios from 'axios';

// Use VITE_API_BASE in production (Railway/Vercel), fall back to /api for local dev
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
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
