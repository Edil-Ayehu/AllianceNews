// UpdateForm.js
import React, { useState, useEffect } from 'react';
import './updateFormStyle.css';

const UpdateForm = ({ initialValues, onUpdate, onCancel }) => {
  const [updatedValues, setUpdatedValues] = useState(initialValues);

  useEffect(() => {
    // Reset the form when initialValues change
    setUpdatedValues(initialValues);
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedValues);
  };

  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={updatedValues.title} onChange={handleInputChange} />

        {/* Replace textarea with input for "Details" */}
        <label>Details:</label>
        <input type="text" name="details" value={updatedValues.details} onChange={handleInputChange} />

        <label>Image URL:</label>
        <input type="text" name="imageUrl" value={updatedValues.imageUrl} onChange={handleInputChange} />

        {/* Add other input fields for category and time if needed */}

        <button type="submit">Update</button> <br />
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateForm;
