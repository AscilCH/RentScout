import React from 'react';
import { Typography, Paper, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon from the correct package

const HomeDetails = ({onClose, rentalHome }) => {
  const { title, images, description, price, location, bathrooms, equipped } = rentalHome;
  return (
    <Paper sx={{ padding: 16 }}>
      <IconButton
        aria-label="Close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <Carousel>
        {images.map((url, index) => (
          <Paper key={index} elevation={0}>
            <img
              src={url}
              alt={`Rental Home ${index}`}
              style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
            />
          </Paper>
        ))}
      </Carousel>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Description: {description}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Price: ${price}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Location: {location}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Bathrooms: {bathrooms}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Equipped: {equipped ? 'Yes' : 'No'}
      </Typography>
      {/* You can add other details here */}
    </Paper>
  );
};

export default HomeDetails;
