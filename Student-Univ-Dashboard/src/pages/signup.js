import React, { useState } from 'react';
import { Typography, Stack, TextField, Button, Select, MenuItem } from '@mui/material';

export default function SignupForm() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>
      {/* Add your signup form fields here */}
      <Stack spacing={3} sx={{ my: 2 }}>
        <TextField label="First Name" variant="outlined" fullWidth />
        <TextField label="Last Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Password" variant="outlined" fullWidth />

        {/* Add your list of options here */}
        <Select
          value={userType}
          onChange={handleUserTypeChange}
          label="Role"
          variant="outlined"
          fullWidth
        >
          {/* Add the default option */}
          {/* Add other options */}
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="renter">Renter</MenuItem>
        </Select>
      </Stack>

      {/* Add your signup button here */}
      <Button fullWidth size="large" variant="contained" color="primary">
        Sign Up
      </Button>
    </>
  );
}
