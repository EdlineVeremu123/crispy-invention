import React, { useState, useEffect } from 'react';
import { clinicAPI } from './api';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import AddVisit from './components/AddVisit';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch patients when component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const patientsData = await clinicAPI.getPatients();
      setPatients(patientsData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      const result = await clinicAPI.addPatient(patientData);
      setSuccessMessage(`Patient added successfully with ID: ${result.patientId}`);
      
      // Refresh the patients list
      await fetchPatients();
      
      // Switch to patients view to show the new patient
      setCurrentView('patients');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err.message);
      console.error('Error adding patient:', err);
    }
  };

  const handleAddVisit = async (visitData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      const result = await clinicAPI.addVisit(visitData);
      setSuccessMessage(`Visit added successfully with ID: ${result.visitId}`);
      
      // Refresh the patients list
      await fetchPatients();
      
      // Switch to patients view to show the updated patient
      setCurrentView('patients');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
      
    } catch (err) {
      setError(err.message);
      console.error('Error adding visit:', err);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'add-patient':
        return <AddPatient onSubmit={handleAddPatient} />;
      case 'add-visit':
        return <AddVisit patients={patients} onSubmit={handleAddVisit} />;
      case 'patients':
      default:
        return (
          <PatientList 
            patients={patients} 
            loading={loading} 
            error={error}
            onRefresh={fetchPatients}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Clinic Management System</h1>
        <p>Patient and Visit Management</p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <button 
          className={currentView === 'patients' ? 'active' : ''}
          onClick={() => setCurrentView('patients')}
        >
          View Patients
        </button>
        <button 
          className={currentView === 'add-patient' ? 'active' : ''}
          onClick={() => setCurrentView('add-patient')}
        >
          Add Patient
        </button>
        <button 
          className={currentView === 'add-visit' ? 'active' : ''}
          onClick={() => setCurrentView('add-visit')}
        >
          Add Visit
        </button>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="success" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
