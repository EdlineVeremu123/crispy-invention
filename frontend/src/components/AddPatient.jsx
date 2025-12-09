import React, { useState } from 'react';

const AddPatient = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0 || parseInt(formData.age) > 150) {
      newErrors.age = 'Age must be a valid number between 0 and 150';
    }

    // Height validation
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (isNaN(formData.height) || parseFloat(formData.height) <= 0 || parseFloat(formData.height) > 300) {
      newErrors.height = 'Height must be a valid number between 1 and 300 cm';
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
        name: formData.name.trim(),
        age: parseInt(formData.age),
        height: parseFloat(formData.height)
      });
      
      // Reset form on success
      setFormData({
        name: '',
        age: '',
        height: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '2rem' }}>
        Add New Patient
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Patient Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient's full name"
            disabled={isSubmitting}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age (years) *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter patient's age"
            min="0"
            max="150"
            disabled={isSubmitting}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (cm) *</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter patient's height in cm"
            min="1"
            max="300"
            step="0.1"
            disabled={isSubmitting}
          />
          {errors.height && <div className="error">{errors.height}</div>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Patient...' : 'Add Patient'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ name: '', age: '', height: '' });
              setErrors({});
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </button>
        </div>
      </form>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '6px', fontSize: '0.9rem', color: '#2c3e50' }}>
        <strong>Instructions:</strong>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>All fields marked with * are required</li>
          <li>Age should be between 0 and 150 years</li>
          <li>Height should be between 1 and 300 cm</li>
          <li>Patient name should be at least 2 characters</li>
        </ul>
      </div>
    </div>
  );
};

export default AddPatient;
