import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import AddVisit from './components/AddVisit';
import { clinicAPI } from './api';
import './index.css';

export default function App() {
  const [currentView, setCurrentView] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => { fetchPatients(); }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true); setError(null);
      const data = await clinicAPI.getPatients();
      setPatients(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleAddPatient = async data => {
    try { setError(null); setSuccessMessage(null);
      const result = await clinicAPI.addPatient(data);
      setSuccessMessage(`Patient added with ID: ${result.patient_id}`);
      await fetchPatients();
      setCurrentView('patients');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch(err) { setError(err.message); }
  };

  const handleAddVisit = async data => {
    try { setError(null); setSuccessMessage(null);
      const result = await clinicAPI.addVisit(data);
      setSuccessMessage(`Visit added with ID: ${result.visit_id}`);
      await fetchPatients();
      setCurrentView('patients');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch(err) { setError(err.message); }
  };

  const renderView = () => {
    switch(currentView) {
      case 'add-patient': return <AddPatient onSubmit={handleAddPatient} />;
      case 'add-visit': return <AddVisit patients={patients} onSubmit={handleAddVisit} />;
      case 'patients':
      default: return <PatientList patients={patients} loading={loading} error={error} onRefresh={fetchPatients} />;
    }
  };

  return (
    <div>
      <header><h1>Clinic Management System</h1></header>
      <nav>
      <button onClick={() => setCurrentView('patients')}>View Patients</button>
      <button onClick={() => setCurrentView('add-patient')}>Add Patient</button>
      <button onClick={() => setCurrentView('add-visit')}>Add Visit</button>
      </nav>

      {error && <p style={{color:'red'}}>{error}</p>}
      {successMessage && <p style={{color:'green'}}>{successMessage}</p>}
      <main>{renderView()}</main>
    </div>
  );
}
