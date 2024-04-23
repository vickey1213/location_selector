import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  AppBar,
  Toolbar,
  TextField,
  Card,
} from "@mui/material";
import data from "./data.json";

const Body = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedNeighborhood("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedDivision("");
    setSelectedDistrict("");
    setSelectedNeighborhood("");
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
    setSelectedNeighborhood("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedNeighborhood("");
  };

  const handleNeighborhoodSelection = (event) => {
    setSelectedNeighborhood(event.target.value);
  };

  const isFormFilled =
    name &&
    email &&
    phone &&
    selectedCountry &&
    selectedState &&
    selectedDivision &&
    selectedDistrict &&
    selectedNeighborhood;

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Location Selector
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={4}>
          <Stack spacing={2} sx={{ width: "30%" }}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
            />
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
            />
            <TextField
              label="Phone"
              placeholder="Enter your phone no"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
            />
          </Stack>
          <Stack spacing={2} sx={{ width: "30%" }}>
            <Typography variant="h6" gutterBottom>
              Select Location
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                label="Country"
              >
                {data.locations.map((location) => (
                  <MenuItem key={location.country} value={location.country}>
                    {location.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCountry && (
              <>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={selectedState}
                    onChange={handleStateChange}
                    label="State"
                  >
                    {data.locations
                      .find((loc) => loc.country === selectedCountry)
                      ?.states.map((state) => (
                        <MenuItem key={state.name} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel>Division</InputLabel>
                  <Select
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    label="Division"
                  >
                    {data.locations
                      .find((loc) => loc.country === selectedCountry)
                      ?.states.find((st) => st.name === selectedState)
                      ?.divisions.map((division) => (
                        <MenuItem key={division.name} value={division.name}>
                          {division.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    label="District"
                  >
                    {data.locations
                      .find((loc) => loc.country === selectedCountry)
                      ?.states.find((st) => st.name === selectedState)
                      ?.divisions.find((div) => div.name === selectedDivision)
                      ?.districts.map((district) => (
                        <MenuItem key={district.name} value={district.name}>
                          {district.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel>Neighborhood</InputLabel>
                  <Select
                    value={selectedNeighborhood}
                    onChange={handleNeighborhoodSelection}
                    label="Neighborhood"
                  >
                    {data.locations
                      .find((loc) => loc.country === selectedCountry)
                      ?.states.find((st) => st.name === selectedState)
                      ?.divisions.find((div) => div.name === selectedDivision)
                      ?.districts.find((dist) => dist.name === selectedDistrict)
                      ?.neighborhoods.map((neighborhood) => (
                        <MenuItem
                          key={neighborhood.name}
                          value={neighborhood.name}
                        >
                          {neighborhood.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Stack>

          <Stack spacing={2} sx={{ width: "30%" }}>
            <Typography variant="h6">Selected Details</Typography>
            {isFormFilled && (
              <Card sx={{ p: 2 }}>
                <Typography variant="body1">Name: {name}</Typography>
                <Typography variant="body1">Email: {email}</Typography>
                <Typography variant="body1">Phone: {phone}</Typography>
                <Typography variant="body1">
                  Address: {selectedNeighborhood}, {selectedDistrict},{" "}
                  {selectedDivision}, {selectedState}, {selectedCountry}
                </Typography>
              </Card>
            )}
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          p: 2,
          bottom: 0,
          left: 0,
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          position: "fixed",
          width: "100%",
        }}
      >
        <Typography variant="body2">© 2024 Location Selector App</Typography>
      </Box>
    </Box>
  );
};

export default Body;
