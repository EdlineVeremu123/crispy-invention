import React from 'react';

export default function PatientList({ patients, loading, error, onRefresh }) {
  if (loading) return <div className="loading">Loading patients...</div>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!Array.isArray(patients) || patients.length === 0) return <p>No patients found</p>;

  return (
    <div>
      <div className="patient-header">
        <h2 className="visits-title">Patients</h2>
        <button className="btn btn-secondary" onClick={onRefresh}>Refresh</button>
      </div>
      <div className="patients-list">
        {patients.map(p => (
          <div key={p.patient_id} className="patient-card">
            <div className="patient-header">
              <h3 className="patient-name">{p.name}</h3>
              <span className="patient-id">ID: {p.patient_id}</span>
            </div>
            <div className="patient-details">
              <div className="patient-detail">
                <span className="patient-detail-label">Age</span>
                <span className="patient-detail-value">{p.age}</span>
              </div>
              <div className="patient-detail">
                <span className="patient-detail-label">Height</span>
                <span className="patient-detail-value">{p.height} cm</span>
              </div>
            </div>
            <div className="visits-section">
              <div className="visits-title">Visits</div>
              {Array.isArray(p.visits) && p.visits.length > 0 ? (
                p.visits.map(v => (
                  <div key={v.visit_id} className="visit-item">
                    <div className="visit-date">{new Date(v.visit_date).toLocaleDateString()}</div>
                    <div className="visit-observations">{v.observations}</div>
                  </div>
                ))
              ) : (
                <div className="no-visits">No visits recorded yet</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
