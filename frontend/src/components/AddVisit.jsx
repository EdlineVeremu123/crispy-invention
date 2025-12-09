import React, { useState } from 'react';

const AddVisit = ({ patients, onSubmit }) => {
  const [formData, setFormData] = useState({
    patient_id: '',
    visit_date: '',
    observations: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique patients for dropdown
  const uniquePatients = patients.reduce((acc, patient) => {
    if (!acc.find(p => p.id === patient.id)) {
      acc.push({
        id: patient.id,
        name: patient.name
      });
    }
    return acc;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Patient validation
    if (!formData.patient_id) {
      newErrors.patient_id = 'Please select a patient';
    }

    // Date validation
    if (!formData.visit_date) {
      newErrors.visit_date = 'Visit date is required';
    } else {
      const selectedDate = new Date(formData.visit_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        newErrors.visit_date = 'Visit date cannot be in the future';
      }
    }

    // Observations validation
    if (!formData.observations.trim()) {
      newErrors.observations = 'Observations are required';
    } else if (formData.observations.trim().length < 10) {
      newErrors.observations = 'Observations must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        patient_id: parseInt(formData.patient_id),
        visit_date: formData.visit_date,
        observations: formData.observations.trim()
      });
      
      // Reset form on success
      setFormData({
        patient_id: '',
        visit_date: '',
        observations: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set default date to today
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (uniquePatients.length === 0) {
    return (
      <div className="form-container">
        <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '2rem' }}>
          Add Visit
        </h2>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
          <h3>No patients available</h3>
          <p>You need to add patients first before creating visits.</p>
          <p>Please add a patient using the "Add Patient" button above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '2rem' }}>
        Add Visit for Patient
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient_id">Select Patient *</label>
          <select
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="">Choose a patient...</option>
            {uniquePatients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (ID: {patient.id})
              </option>
            ))}
          </select>
          {errors.patient_id && <div className="error">{errors.patient_id}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="visit_date">Visit Date *</label>
          <input
            type="date"
            id="visit_date"
            name="visit_date"
            value={formData.visit_date}
            onChange={handleChange}
            max={getTodayDate()}
            disabled={isSubmitting}
          />
          {errors.visit_date && <div className="error">{errors.visit_date}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="observations">Medical Observations *</label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            placeholder="Enter detailed medical observations, symptoms, treatment notes, etc."
            rows="6"
            disabled={isSubmitting}
          />
          {errors.observations && <div className="error">{errors.observations}</div>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Visit...' : 'Add Visit'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ patient_id: '', visit_date: '', observations: '' });
              setErrors({});
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '6px', fontSize: '0.9rem', color: '#856404' }}>
        <strong>Important Notes:</strong>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>All fields marked with * are required</li>
          <li>Visit date cannot be in the future</li>
          <li>Observations should be detailed and professional</li>
          <li>Please include symptoms, diagnosis, treatment notes, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddVisit;
