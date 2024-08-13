import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, MenuItem, Button } from '@mui/material';
// components

import Hcards from './hcards';

const tunisianUniversities = [
  'University of Tunis El Manar',
  'University of Carthage',
  'University of Sfax',
  'University of Monastir',
  'University of Gabes',
  'University of Sousse',
  'University of Jendouba',
  'University of Kairouan',
  'University of Gafsa',
  'University of Kasserine',
  'University of Manouba',
  'University of Bizerte',
  'University of 7th November at Carthage',
  'University of 7th November at Gafsa',
  'University of 7th November at Bizerte',
  // Add more universities here, but make sure there are no duplicates
];

const universityInstitutionsMap = {
  'University of Tunis El Manar': [
    'Institution A',
    'Institution B',
    // Add more institutions for University of Tunis El Manar
  ],
  'University of Carthage': [
    'Institution X',
    'Institution Y',
    // Add more institutions for University of Carthage
  ],
  'University of Sfax': [
    'Institution P',
    'Institution Q',
    // Add more institutions for University of Sfax
  ],
  // Add institutions for other universities
};

export default function DashboardAppPage() {
  const theme = useTheme();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const institutions = universityInstitutionsMap[selectedUniversity] || [];
  const [showHomeCards, setShowHomeCards] = useState(false);

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
    setSelectedInstitution(''); // Reset selected institution when changing the university
  };

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
  };

  const handleGoToHomeCards = () => {
    setShowHomeCards(true);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Minimal UI</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        {/* Conditionally render the first Select */}
        {!showHomeCards && (
          <Select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            displayEmpty
            fullWidth
            sx={{ mb: 3 }}
          >
            <MenuItem value="" disabled>
              Select a university
            </MenuItem>
            {tunisianUniversities.map((university) => (
              <MenuItem key={university} value={university}>
                {university}
              </MenuItem>
            ))}
          </Select>
        )}

        {/* Conditionally render the second Select */}
        {selectedUniversity && !showHomeCards && (
          <Select
            value={selectedInstitution}
            onChange={handleInstitutionChange}
            displayEmpty
            fullWidth
            sx={{ mb: 3 }}
          >
            <MenuItem value="" disabled>
              Select an institution
            </MenuItem>
            {institutions.map((institution) => (
              <MenuItem key={institution} value={institution}>
                {institution}
              </MenuItem>
            ))}
          </Select>
        )}

        {/* Conditionally render the button */}
        {selectedInstitution && !showHomeCards && (
          <Button onClick={handleGoToHomeCards} variant="contained" color="primary">
            Go to Home Cards
          </Button>
        )}

        {/* Show HomeCards component when the button is clicked */}
        {showHomeCards && (
          <Hcards
            selectedUniversity={selectedUniversity}
            selectedInstitution={selectedInstitution}
          />
        )}
      </Container>
    </>
  );
}
