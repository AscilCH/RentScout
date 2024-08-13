import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import "regenerator-runtime/runtime";
import { Container, Typography, Card, CardContent, CardHeader, Grid, TextField, MenuItem, Button } from '@mui/material';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import HomeDetails from './HomeDetails'; // Import the HomeDetails component

const sampleData = {
  'University of Tunis El Manar': {
    coordinates: { lat: 36.8188, lng: 10.1659 },
    'Institution A': {
      title: 'Institution A',
      description: 'Description for Institution A in University of Tunis El Manar.',
      coordinates: { lat: 36.8185, lng: 10.1657 },
      rentalHomes: [
        {
          id: 1,
          title: 'Rental Home 1',
          air_conditioning: true,
          town_gaz: false,
          rooms_numb: 3,
          parking: true,
          floor: 2,
          images: ['url1', 'url2', 'url3'],
          description: 'Description for Rental Home 1 in Institution A.',
          price: 1000,
          location: 'Location A',
          coordinates: { lat: 36.8182, lng: 10.1656 },
          bathrooms: 2,
          equipped: true,
        },
        {
          id: 2,
          title: 'Rental Home 2',
          air_conditioning: false,
          town_gaz: true,
          rooms_numb: 2,
          parking: true,
          floor: 1,
          images: ['url4', 'url5', 'url6'],
          description: 'Description for Rental Home 2 in Institution A.',
          price: 1200,
          location: 'Location B',
          coordinates: { lat: 36.8189, lng: 10.1658 },
          bathrooms: 1,
          equipped: false,
        },
      ],
    },
    'Institution B': {
      title: 'Institution B',
      description: 'Description for Institution B in University of Tunis El Manar.',
      coordinates: { lat: 36.8183, lng: 10.1654 },
      rentalHomes: [
        {
          id: 3,
          title: 'Rental Home 3',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 4,
          parking: false,
          floor: 3,
          images: ['url7', 'url8', 'url9'],
          description: 'Description for Rental Home 3 in Institution B.',
          price: 800,
          location: 'Location C',
          coordinates: { lat: 36.8187, lng: 10.1653 },
          bathrooms: 2,
          equipped: true,
        },
        {
          id: 4,
          title: 'Rental Home 4',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 3,
          parking: true,
          floor: 5,
          images: ['url10', 'url11', 'url12'],
          description: 'Description for Rental Home 4 in Institution B.',
          price: 1500,
          location: 'Location D',
          coordinates: { lat: 36.8191, lng: 10.1655 },
          bathrooms: 2,
          equipped: false,
        },
      ],
    },
  },
  'University of Carthage': {
    coordinates: { lat: 36.8533, lng: 10.2221 },
    'Institution X': {
      title: 'Institution X',
      description: 'Description for Institution X in University of Carthage.',
      coordinates: { lat: 36.8530, lng: 10.2219 },
      rentalHomes: [
        {
          id: 5,
          title: 'Rental Home 5',
          air_conditioning: false,
          town_gaz: true,
          rooms_numb: 2,
          parking: false,
          floor: 1,
          images: ['url13', 'url14', 'url15'],
          description: 'Description for Rental Home 5 in Institution X.',
          price: 900,
          location: 'Location E',
          coordinates: { lat: 36.8536, lng: 10.2222 },
          bathrooms: 1,
          equipped: true,
        },
        {
          id: 6,
          title: 'Rental Home 6',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 3,
          parking: true,
          floor: 3,
          images: ['url16', 'url17', 'url18'],
          description: 'Description for Rental Home 6 in Institution X.',
          price: 1100,
          location: 'Location F',
          coordinates: { lat: 36.8534, lng: 10.2223 },
          bathrooms: 2,
          equipped: true,
        },
      ],
    },
    'Institution Y': {
      title: 'Institution Y',
      description: 'Description for Institution Y in University of Carthage.',
      coordinates: { lat: 36.8531, lng: 10.2217 },
      rentalHomes: [
        {
          id: 7,
          title: 'Rental Home 7',
          air_conditioning: true,
          town_gaz: false,
          rooms_numb: 3,
          parking: true,
          floor: 2,
          images: ['url19', 'url20', 'url21'],
          description: 'Description for Rental Home 7 in Institution Y.',
          price: 750,
          location: 'Location G',
          coordinates: { lat: 36.8532, lng: 10.2215 },
          bathrooms: 2,
          equipped: false,
        },
        {
          id: 8,
          title: 'Rental Home 8',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 4,
          parking: true,
          floor: 4,
          images: ['url22', 'url23', 'url24'],
          description: 'Description for Rental Home 8 in Institution Y.',
          price: 1350,
          location: 'Location H',
          coordinates: { lat: 36.8535, lng: 10.2218 },
          bathrooms: 2,
          equipped: true,
        },
      ],
    },
  },
  'University of Sfax': {
    coordinates: { lat: 34.7406, lng: 10.7598 },
    'Institution P': {
      title: 'Institution P',
      description: 'Description for Institution P in University of Sfax.',
      coordinates: { lat: 34.7408, lng: 10.7599 },
      rentalHomes: [
        {
          id: 9,
          title: 'Rental Home 9',
          air_conditioning: false,
          town_gaz: true,
          rooms_numb: 3,
          parking: true,
          floor: 2,
          images: ['url25', 'url26', 'url27'],
          description: 'Description for Rental Home 9 in Institution P.',
          price: 950,
          location: 'Location I',
          coordinates: { lat: 34.7407, lng: 10.7600 },
          bathrooms: 2,
          equipped: true,
        },
        {
          id: 10,
          title: 'Rental Home 10',
          air_conditioning: true,
          town_gaz: false,
          rooms_numb: 2,
          parking: true,
          floor: 1,
          images: ['url28', 'url29', 'url30'],
          description: 'Description for Rental Home 10 in Institution P.',
          price: 1050,
          location: 'Location J',
          coordinates: { lat: 34.7409, lng: 10.7597 },
          bathrooms: 1,
          equipped: false,
        },
      ],
    },
    'Institution Q': {
      title: 'Institution Q',
      description: 'Description for Institution Q in University of Sfax.',
      coordinates: { lat: 34.7410, lng: 10.7595 },
      rentalHomes: [
        {
          id: 11,
          title: 'Rental Home 11',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 3,
          parking: true,
          floor: 2,
          images: ['url31', 'url32', 'url33'],
          description: 'Description for Rental Home 11 in Institution Q.',
          price: 700,
          location: 'Location K',
          coordinates: { lat: 34.7405, lng: 10.7596 },
          bathrooms: 2,
          equipped: true,
        },
        {
          id: 12,
          title: 'Rental Home 12',
          air_conditioning: true,
          town_gaz: true,
          rooms_numb: 4,
          parking: true,
          floor: 3,
          images: ['url34', 'url35', 'url36'],
          description: 'Description for Rental Home 12 in Institution Q.',
          price: 1400,
          location: 'Location L',
          coordinates: { lat: 34.7412, lng: 10.7594 },
          bathrooms: 2,
          equipped: true,
        },
      ],
    },
  },
  // Add data for other universities and institutions as needed
};

const equippedOptions = [
  { value: null, label: 'All' },
  { value: true, label: 'Equipped' },
  { value: false, label: 'Not Equipped' },
];

const floorOptions = [
  { value: null, label: 'All' },
  { value: 1, label: '1st Floor' },
  { value: 2, label: '2nd Floor' },
  // Add more options as needed
];

const roomNumberOptions = [
  { value: null, label: 'All' },
  { value: 1, label: '1 Room' },
  { value: 2, label: '2 Rooms' },
  { value: 3, label: '3 Rooms' },
  // Add more options as needed
];

const townGazOptions = [
  { value: null, label: 'All' },
  { value: true, label: 'Town Gaz' },
  { value: false, label: 'No Town Gaz' },
];

const airConditioningOptions = [
  { value: null, label: 'All' },
  { value: true, label: 'Air Conditioning' },
  { value: false, label: 'No Air Conditioning' },
];



const HomeCards = ({ selectedUniversity, selectedInstitution }) => {
  const universityData = sampleData[selectedUniversity]?.[selectedInstitution];
    // State to determine whether to show the HomeDetails component
    const [showHomeDetails, setShowHomeDetails] = useState(false);

  useEffect(() => {
    // Fetch additional data or perform other actions here if needed
    // For this example, we're just displaying the data from the sampleData object
  }, [selectedUniversity, selectedInstitution]);

  // Generate random markers for Google Maps
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (universityData) {
      const newMarkers = [];
      for (let i = 1; i <= 10; i += 1) {
        const lat = universityData.coordinates.lat + (Math.random() - 0.5) * 0.02; // Random latitude within a range
        const lng = universityData.coordinates.lng + (Math.random() - 0.5) * 0.02; // Random longitude within a range
        newMarkers.push({
          id: i,
          title: `Marker ${i}`,
          position: { lat, lng },
        });
      }
      setMarkers(newMarkers);
    }
  }, [selectedUniversity, selectedInstitution, universityData]);

  const [selectedRentalHome, setSelectedRentalHome] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedLocation, setSelectedLocation] = useState(' ');
  const [filteredRentalHomes, setFilteredRentalHomes] = useState([]);
  const [selectedBathroomNumber, setSelectedBathroomNumber] = useState(null);
  const [selectedEquipped, setSelectedEquipped] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [selectedTownGaz, setSelectedTownGaz] = useState(null);
  const [selectedAirConditioning, setSelectedAirConditioning] = useState(null);

  useEffect(() => {
    if (universityData) {
      const locations = universityData.rentalHomes.map((rentalHome) => rentalHome.location);
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setSelectedLocation(randomLocation);
      applyFilters();
    }
  }, [universityData, selectedBathroomNumber, selectedEquipped, selectedFloor, selectedRoomNumber, selectedTownGaz, selectedAirConditioning]);
  

  // Function to handle marker click event
  const handleMarkerClick = (rentalHome) => {
    setSelectedRentalHome(rentalHome);
  };

  // Function to handle filter application
  const applyFilters = () => {
    const filteredHomes = universityData
      ? universityData.rentalHomes.filter(
          (rentalHome) =>
            parseFloat(rentalHome.price) >= priceRange.min &&
            parseFloat(rentalHome.price) <= priceRange.max &&
            (selectedLocation === '' || rentalHome.location.toLowerCase().includes(selectedLocation.toLowerCase())) &&
            (selectedBathroomNumber === null || rentalHome.bathrooms === selectedBathroomNumber) &&
            (selectedEquipped === null || rentalHome.equipped === selectedEquipped) &&
            (selectedFloor === null || rentalHome.floor === selectedFloor) &&
            (selectedRoomNumber === null || rentalHome.rooms_numb === selectedRoomNumber) &&
            (selectedTownGaz === null || rentalHome.town_gaz === selectedTownGaz) &&
            (selectedAirConditioning === null || rentalHome.air_conditioning === selectedAirConditioning)
        )
      : [];
    setFilteredRentalHomes(filteredHomes);
  };
  

  // Define the findRentalHomeById function
  const findRentalHomeById = (data, id) => {
    try {
      const universities = Object.values(data);
      const rentalHome = universities
        .flatMap((university) => Object.values(university))
        .flatMap((institution) => institution.rentalHomes || [])
        .find((home) => home.id === id);
  
      if (rentalHome) {
        return rentalHome;
      }
  
      console.warn('Rental home with ID', id, 'not found in the sample data.');
      return null;
    } catch (error) {
      console.error('Error finding rental home by ID:', error);
      return null;
    }
  };
  

  const locationOptions = [
    { value: '', label: 'All Locations' },
    ...universityData?.rentalHomes.map((rentalHome) => ({
      value: rentalHome.location,
      label: rentalHome.location,
    })),
  ];
  const handleCardClick = (rentalHomeId) => {
    const rentalHome = findRentalHomeById(sampleData, rentalHomeId.id);
    setSelectedRentalHome(rentalHome);
    setShowHomeDetails(true); // Show the HomeDetails component
  };
  

  // Function to close the HomeDetails component
  const handleCloseHomeDetails = () => {
    setShowHomeDetails(false);
    console.log('clicked button')
  };
  return (
    <>
      <Helmet>
        <title>HomeCards | Minimal UI</title>
      </Helmet>
      {showHomeDetails?
            <HomeDetails
            onClose={handleCloseHomeDetails}
            rentalHome={selectedRentalHome}
          />
      :
      <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mt: 4, mb: 5 }}>
        HomeCards Page
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Min Price ($)"
            variant="outlined"
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) })}
            inputProps={{ min: 0, max: priceRange.max }}
            sx={{ width: '100%', mb: 2 }}
          />
          <TextField
            label="Max Price ($)"
            variant="outlined"
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) })}
            inputProps={{ min: priceRange.min, max: 2000 }}
            sx={{ width: '100%', mb: 2 }}
          />
          <TextField
              select
              label="Bathroom Number"
              variant="outlined"
              value={selectedBathroomNumber}
              onChange={(e) => setSelectedBathroomNumber(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value={1}>1 bathroom</MenuItem>
            <MenuItem value={2}>2 bathrooms</MenuItem>
            <MenuItem value={3}>3 bathrooms</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Location"
            variant="outlined"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            sx={{ width: '100%', mb: 2 }}
          >
            {locationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

            <TextField
              select
              label="Equipped"
              variant="outlined"
              value={selectedEquipped}
              onChange={(e) => setSelectedEquipped(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            >
              {equippedOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* ... */}
            <TextField
              select
              label="Town Gaz"
              variant="outlined"
              value={selectedTownGaz}
              onChange={(e) => setSelectedTownGaz(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            >
              {townGazOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Room Number"
              variant="outlined"
              value={selectedRoomNumber}
              onChange={(e) => setSelectedRoomNumber(e.target.value)}
              sx={{ width: '100%', mb: 2 }}
            >
              {roomNumberOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
              <TextField
                select
                label="Air Conditioning"
                variant="outlined"
                value={selectedAirConditioning}
                onChange={(e) => setSelectedAirConditioning(e.target.value)}
                sx={{ width: '100%', mb: 2 }}
              >
                {airConditioningOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" onClick={applyFilters} sx={{ width: '100%' }}>
                Apply Filters
              </Button>
              {/* ... */}


        </Grid>
      </Grid>
      {/* Display the filtered cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {universityData ? (
            <div>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {universityData.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {universityData.description}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Rental Homes:
              </Typography>
              {filteredRentalHomes.length > 0 ? (
                filteredRentalHomes.map((rentalHome) => (
              <Card
                key={rentalHome.id}
                onClick={() => handleCardClick(rentalHome)} // Set the selected rental home directly
                sx={{
                  mb: 2,
                  backgroundColor: selectedRentalHome === rentalHome ? '#ebebeb' : 'white',
                }}
              >

                    <CardHeader title={rentalHome.title} />
                    <CardContent>
                      <Typography variant="body1">Price: ${rentalHome.price}</Typography>
                      <Typography variant="body2">Location: {rentalHome.location}</Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body1">No rental homes match the selected filters.</Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1">
              No details found for the selected university and institution.
            </Typography>
          )}
        </Grid>

        {/* Display Google Maps on the right */}
        <Grid item xs={12} md={6}>
          {universityData && (
            <LoadScript googleMapsApiKey="AIzaSyAl3fIENN8B0ISy5YnALKTVG7k8MpVxW08">
              <GoogleMap
                mapContainerStyle={{ height: '400px', borderRadius: '8px' }}
                center={universityData.coordinates} // Center the map on the selected university's coordinates
                zoom={12}
              >
                {/* Display markers for rental homes */}
                {filteredRentalHomes.map((rentalHome) => (
                  <Marker
                    key={rentalHome.id}
                    position={rentalHome.coordinates}
                    title={rentalHome.title}
                    onClick={() => handleMarkerClick(rentalHome)}
                  />
                ))}

                {/* Display markers for institutions */}
                <Marker
                  key={universityData.title}
                  position={universityData.coordinates}
                  title={universityData.title}
                />
              </GoogleMap>
            </LoadScript>
          )}
        </Grid>
      </Grid>
    </Container>
      }

    </>
  );
};

export default HomeCards;
