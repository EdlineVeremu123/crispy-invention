import React from 'react';

export default function PatientList({ patients, loading, error, onRefresh }) {
  if (loading) return <p>Loading patients...</p>;
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>;
  if (!Array.isArray(patients) || patients.length === 0) return <p>No patients found</p>;

  return (
    <div>
      <h2>Patient List</h2>
      {patients.map(p => (
        <div key={p.patient_id}>
          {p.name} - Age: {p.age}, Height: {p.height} cm
        </div>
      ))}
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
}
