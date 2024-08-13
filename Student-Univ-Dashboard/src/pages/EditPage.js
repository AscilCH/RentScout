import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import Calendar from './Calendar'


function EditPage({ userData, setUserData, setEditMode }) {
  
  
    const handleCancelEdit = () => {
    setEditMode(false);
  };

  if (!userData) {
    return (
      <Typography variant="body1">
        No user data found for editing.
      </Typography>
    );
  }

  const {
    MaisonName,
    description,
    price,
    // Add other properties here based on your data structure
    // ...
  } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted with updated data:', userData);
    setEditMode(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Maison
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Maison Name"
          variant="outlined"
          name="MaisonName"
          value={MaisonName}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, MaisonName: e.target.value }))}
          required
          fullWidth
          margin="normal"
        />

        {/* Use TextField for the Description field */}
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={description}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, description: e.target.value }))}
          required
          multiline
          minRows={4}
          maxRows={8}
          fullWidth
          margin="normal"
        />

        <TextField
          type="number"
          label="Price"
          variant="outlined"
          name="price"
          value={price}
          onChange={(e) => setUserData((prevData) => ({ ...prevData, price: e.target.value }))}
          required
          fullWidth
          margin="normal"
        />
        <Calendar />


        {/* Add other fields here based on your data structure */}
        {/* ... */}

        <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
          Cancel
        </Button>
        
      </form>
    </div>
  );
}

export default EditPage;
