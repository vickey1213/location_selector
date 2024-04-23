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
import data from "./data.json"; // Ensure data is imported correctly.

const Body = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Function to handle changes in country selection
  const handleCountryChange = (event) => {
    const newCountry = event.target.value;
    setSelectedCountry(newCountry);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setSelectedVillage("");
  };

  // Function to handle changes in state selection
  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setSelectedVillage("");
  };

  // Function to handle changes in district selection
  const handleDistrictChange = (event) => {
    const newDistrict = event.target.value;
    setSelectedDistrict(newDistrict);
    setSelectedSubDistrict("");
    setSelectedVillage("");
  };

  // Function to handle changes in sub-district selection
  const handleSubDistrictChange = (event) => {
    const newSubDistrict = event.target.value;
    setSelectedSubDistrict(newSubDistrict);
    setSelectedVillage("");
  };

  // Function to handle changes in village selection
  const handleVillageChange = (event) => {
    setSelectedVillage(event.target.value);
  };

  // Filters for dropdowns calculated on-the-fly
  const filteredStates = selectedCountry
    ? data
        .filter((item) => item.Country === selectedCountry)
        .map((item) => item.State)
    : [];
  const filteredDistricts = selectedState
    ? data
        .filter((item) => item.State === selectedState)
        .map((item) => item.District)
    : [];
  const filteredSubDistricts = selectedDistrict
    ? data
        .filter((item) => item.District === selectedDistrict)
        .map((item) => item["Sub District"])
    : [];
  const filteredVillages = selectedSubDistrict
    ? data
        .filter((item) => item["Sub District"] === selectedSubDistrict)
        .map((item) => item.Village)
    : [];

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
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              placeholder="Enter your phone no"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                {Array.from(new Set(data.map((item) => item.Country))).map(
                  (country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>State</InputLabel>
              <Select
                value={selectedState}
                onChange={handleStateChange}
                label="State"
              >
                {Array.from(new Set(filteredStates)).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
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
                {Array.from(new Set(filteredDistricts)).map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Sub-District</InputLabel>
              <Select
                value={selectedSubDistrict}
                onChange={handleSubDistrictChange}
                label="Sub-District"
              >
                {Array.from(new Set(filteredSubDistricts)).map(
                  (subDistrict) => (
                    <MenuItem key={subDistrict} value={subDistrict}>
                      {subDistrict}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Village</InputLabel>
              <Select
                value={selectedVillage}
                onChange={handleVillageChange}
                label="Village"
              >
                {Array.from(new Set(filteredVillages)).map((village) => (
                  <MenuItem key={village} value={village}>
                    {village}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={2} sx={{ width: "30%" }}>
            <Typography variant="h6">Selected Details</Typography>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">Name: {name}</Typography>
              <Typography variant="body1">Email: {email}</Typography>
              <Typography variant="body1">Phone: {phone}</Typography>
              <Typography variant="body1">
                Address: {selectedVillage}, {selectedSubDistrict},{" "}
                {selectedDistrict}, {selectedState}, {selectedCountry}
              </Typography>
            </Card>
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
