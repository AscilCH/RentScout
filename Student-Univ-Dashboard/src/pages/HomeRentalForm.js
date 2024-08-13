import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Box,
  Typography,
} from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 34.8, // Default latitude
  lng: 10.6, // Default longitude
};

const MapComponent = ({ onMarkerDragEnd }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
    >
      <Marker
        position={defaultCenter}
        draggable
        onDragEnd={(e) =>
          onMarkerDragEnd({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      />
    </GoogleMap>
  );
};

const HomeRentalForm = ({ updateCoordinates }) => {
  const [coordinates, setCoordinates] = useState(defaultCenter);

  const handleMarkerDragEnd = (markerCoordinates) => {
    setCoordinates(markerCoordinates);
    // Call the updateCoordinates function to update MaisonInfo state in the parent component
    updateCoordinates(markerCoordinates.lat, markerCoordinates.lng);
  };

  return (
    <div>
      <Box textAlign="center" mt={3}>
        <Typography variant="h4">Current Coordinates</Typography>
        <Typography variant="body1">Latitude: {coordinates.lat}</Typography>
        <Typography variant="body1">Longitude: {coordinates.lng}</Typography>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        <LoadScript
          googleMapsApiKey="AIzaSyAl3fIENN8B0ISy5YnALKTVG7k8MpVxW08"
        >
          <MapComponent onMarkerDragEnd={handleMarkerDragEnd} />
        </LoadScript>
      </Box>
    </div>
  );
};

export default HomeRentalForm;
