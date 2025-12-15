import React, { useState } from 'react';

export default function AddPatient({ onSubmit }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, age, height });
    setName(''); setAge(''); setHeight('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Patient</h2>
      <div className="form-group">
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Height (cm)</label>
        <input type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} required />
      </div>
      <button className="btn btn-primary" type="submit">Add Patient</button>
    </form>
  );
}
