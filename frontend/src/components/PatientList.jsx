import React from 'react';

const PatientList = ({ patients, loading, error, onRefresh }) => {
  // Group patients by patient ID and combine their visits
  const groupedPatients = patients.reduce((acc, patient) => {
    const existingPatient = acc.find(p => p.id === patient.id);
    
    if (existingPatient) {
      // Add visit to existing patient's visits
      if (patient.visit_date && patient.observations) {
        existingPatient.visits.push({
          visit_date: patient.visit_date,
          observations: patient.observations
        });
      }
    } else {
      // Create new patient entry
      acc.push({
        id: patient.id,
        name: patient.name,
        age: patient.age,
        height: patient.height,
        visits: []
      });
      
      // Add visit if exists
      if (patient.visit_date && patient.observations) {
        acc[acc.length - 1].visits.push({
          visit_date: patient.visit_date,
          observations: patient.observations
        });
      }
    }
    
    return acc;
  }, []);

  // Sort visits by date (newest first)
  groupedPatients.forEach(patient => {
    patient.visits.sort((a, b) => new Date(b.visit_date) - new Date(a.visit_date));
  });

  if (loading) {
    return (
      <div className="loading">
        Loading patients...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="error">Error loading patients: {error}</div>
        <button 
          className="btn btn-secondary" 
          onClick={onRefresh}
          style={{ marginTop: '1rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (groupedPatients.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No patients found</h3>
        <p>Start by adding your first patient using the "Add Patient" button above.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>
          Patients ({groupedPatients.length})
        </h2>
        <button className="btn btn-secondary" onClick={onRefresh}>
          Refresh
        </button>
      </div>
      
      <div className="patients-list">
        {groupedPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header">
              <h3 className="patient-name">{patient.name}</h3>
              <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                ID: {patient.id}
              </span>
            </div>
            
            <div className="patient-details">
              <div className="patient-detail">
                <span className="patient-detail-label">Age</span>
                <span className="patient-detail-value">{patient.age} years</span>
              </div>
              <div className="patient-detail">
                <span className="patient-detail-label">Height</span>
                <span className="patient-detail-value">{patient.height} cm</span>
              </div>
              <div className="patient-detail">
                <span className="patient-detail-label">Total Visits</span>
                <span className="patient-detail-value">{patient.visits.length}</span>
              </div>
            </div>

            <div className="visits-section">
              <h4 className="visits-title">Visit History</h4>
              {patient.visits.length > 0 ? (
                patient.visits.map((visit, index) => (
                  <div key={index} className="visit-item">
                    <div className="visit-date">
                      {new Date(visit.visit_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="visit-observations">
                      {visit.observations}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-visits">
                  No visits recorded yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
