import React, { useState } from 'react';

export default function AddVisit({ patients, onSubmit }) {
  const [patient_id, setPatientId] = useState('');
  const [visit_date, setVisitDate] = useState('');
  const [observations, setObservations] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ patient_id, visit_date, observations });
    setPatientId(''); setVisitDate(''); setObservations('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Visit</h2>
      <div className="form-group">
        <label>Patient</label>
        <select value={patient_id} onChange={e => setPatientId(e.target.value)} required>
          <option value="">Select patient</option>
          {patients.map(p => (
            <option key={p.patient_id} value={p.patient_id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date</label>
        <input type="date" value={visit_date} onChange={e => setVisitDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Observations</label>
        <textarea value={observations} onChange={e => setObservations(e.target.value)} required />
      </div>
      <button className="btn btn-primary" type="submit">Add Visit</button>
    </form>
  );
}
