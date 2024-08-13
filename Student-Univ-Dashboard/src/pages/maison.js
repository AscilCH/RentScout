
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import formData from "./formData"; // Import the formData array
import HomeRentalForm from "./HomeRentalForm";

const MaisonForm = () => {
  const [MaisonInfo, setMaisonInfo] = useState({
    MaisonName: "",
    description: "",
    price: "",
    location: { lat: "", lng: "" },
    images: [],
    isAvailable: false,
    cliniques: [], 
    Calendar: [],
  });

  const [previewImageIndex, setPreviewImageIndex] = useState(null);
  const [cliniqueName, setCliniqueName] = useState("");
  const [cliniqueList, setCliniqueList] = useState([]);
  
  const updateCoordinates = (lat, lng) => {
    setMaisonInfo((prevState) => ({
      ...prevState,
      location: {
        lat: parseFloat(lat), // Convert the string value to a float
        lng: parseFloat(lng), // Convert the string value to a float
      },
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaisonInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);
    const promises = imagesArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const img = new Image();

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const width = 600;
            const height = 800;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
              resolve(blob);
            }, "image/jpeg", 0.9);
          };

          img.src = event.target.result;
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((resizedImages) => {
      setMaisonInfo((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...resizedImages.map(URL.createObjectURL)],
      }));
    });
  };

  const handleOpenPreview = (index) => {
    setPreviewImageIndex(index);
  };

  const handleClosePreview = () => {
    setPreviewImageIndex(null);
  };

  const handleImageDelete = (index) => {
    const updatedImages = MaisonInfo.images.filter((_, i) => i !== index);
    setMaisonInfo((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setMaisonInfo((prevState) => ({
      ...prevState,
      isAvailable: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", MaisonInfo);

    // Add the MaisonInfo to cliniques list
    setMaisonInfo((prevState) => ({
      ...prevState,
      cliniques: [...prevState.cliniques, ...cliniqueList],
    }));

    // Save the form data
    formData.push(MaisonInfo);

    // Reset the form
    setMaisonInfo((prevState) => ({
      ...prevState,
      MaisonName: "",
      description: "",
      price: "",
      location: "",
      images: [],
      isAvailable: false,
    }));
  };

  const handleAddClinique = () => {
    if (cliniqueName) {
      const isCliniqueExist = cliniqueList.some(
        (clinique) => clinique.name === cliniqueName
      );

      if (isCliniqueExist) {
        alert("The clinic already exists in the list.");
      } else {
        const newClinique = {
          name: cliniqueName,
        };
        setCliniqueList([...cliniqueList, newClinique]);
        setMaisonInfo((prevState) => ({
          ...prevState,
          cliniques: [...prevState.cliniques, newClinique],
        }));
        setCliniqueName("");
      }
    }
  };

  const handleDeleteClinique = (index) => {
    const updatedCliniqueList = [...cliniqueList];
    updatedCliniqueList.splice(index, 1);
    setCliniqueList(updatedCliniqueList);
    setMaisonInfo((prevState) => ({
      ...prevState,
      cliniques: updatedCliniqueList,
    }));
  };

  const handleCliniqueChange = (e) => {
    setCliniqueName(e.target.value);
  };

  console.log("MaisonInfo:", MaisonInfo);

  return (
    <div>
      <Box textAlign="center" mt={3}>
        <Typography variant="h6">Add Clinic</Typography>
        <Select
          label="Clinique Name"
          variant="outlined"
          name="cliniqueName"
          value={cliniqueName}
          onChange={handleCliniqueChange}
          required
          fullWidth
          margin="normal"
        >
          <MenuItem value="Sfax El Medina">Sfax El Medina</MenuItem>
          <MenuItem value="Clinique Echifa">Clinique Echifa</MenuItem>
          <MenuItem value="Polyclinique Ennour">Polyclinique Ennour</MenuItem>
          <MenuItem value="Polyclinique Syphax">Polyclinique Syphax</MenuItem>
          <MenuItem value="Errayhane">Errayhane</MenuItem>
          <MenuItem value="El Hanene">El Hanene</MenuItem>
          <MenuItem value="Azur">Azur</MenuItem>
          <MenuItem value="Imen">Imen</MenuItem>
        </Select>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClinique}
          >
            Add Clinic
          </Button>
        </Box>
        <Box mt={3}>
          <Typography variant="h6">Clinique List</Typography>
          <List>
            {cliniqueList.map((clinique, index) => (
              <ListItem key={index}>
                <ListItemText primary={clinique.name} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClinique(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Maison Form
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="100%">
              <TextField
                label="Maison Name"
                variant="outlined"
                name="MaisonName"
                value={MaisonInfo.MaisonName}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />

              {/* Use TextField for the Description field */}
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={MaisonInfo.description}
                onChange={handleChange}
                required
                multiline
                minRows={4}
                maxRows={8}
                fullWidth
                margin="normal"
              />

              <TextField
                type="number"
                label="prix par jour en Dinars"
                variant="outlined"
                name="price"
                value={MaisonInfo.price}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>
          <Box width="100%">
          <HomeRentalForm updateCoordinates={updateCoordinates} />          </Box>

          <label
            htmlFor="imageInput"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <Button component="span" variant="contained" color="primary">
              <span style={{ marginRight: "5px" }}>Upload Image</span>
              <span role="img" aria-label="camera">
                📷
              </span>
            </Button>
            <input
              type="file"
              id="imageInput"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />
          </label>
          {MaisonInfo.images.length > 0 && (
            <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
              {MaisonInfo.images.map((imageUrl, index) => (
                <div key={index}>
                  <ButtonBase
                    onClick={() => handleOpenPreview(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleOpenPreview(index);
                      }
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      style={{
                        width: "150px",
                        height: "auto",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </ButtonBase>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleImageDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Box>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={MaisonInfo.isAvailable}
                onChange={handleAvailabilityChange}
                id="availabilityCheckbox"
              />
            }
            label="Available for Rent"
            htmlFor="availabilityCheckbox"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        <Dialog
          open={previewImageIndex !== null}
          onClose={handleClosePreview}
          maxWidth="md"
        >
          <DialogContent>
            {previewImageIndex !== null && (
              <img
                src={MaisonInfo.images[previewImageIndex]}
                alt=""
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default MaisonForm