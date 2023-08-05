import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import "../Jobs/Jobs.css";
import { Button } from "@mui/material";
import axios from "axios";

function ProfileFilter(props) {

 
  const {
    handleSpecialization,
    handleLocation,
    handleExperience,
    handleSearch,
    profiles
  } = useContext(SearchContext);



  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [value3, setValue3] = React.useState(null);


  
  return (
    <>
      <Grid container spacing={2} className="filterContainer">
        <Grid item xs={10} sm={4} md={3} lg={2} xl={2.5}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            // inputValue={hospitalname}
            onInputChange={(event, newInputValue) => {
              handleExperience(newInputValue);
            }}
            id="controllable-states-demo"
            options={props.option1}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label1}
                className="filterInput"
                //placeholder="Enter hospital name"
              />
            )}
          />
        </Grid>
        <Grid item xs={10} sm={4} md={2.5} lg={2} xl={2.5}>
          <Autocomplete
            value={value2}
            onChange={(event, newValue) => {
              setValue2(newValue);
            }}
            // inputValue={location}
            onInputChange={(event, newInputValue) => {
              handleLocation(newInputValue);
            }}
            id="controllable-states-demo"
            // options={options2}
            options={props.option2}
            renderInput={(params) => (
              <TextField
                {...params}
                //label="Location"
                label={props.label2}
                className="filterInput"
               // placeholder="Enter your location"
              />
            )}
          />
        </Grid>
        <Grid item xs={10} sm={4} md={2.5} lg={2} xl={2.5}>
          <Autocomplete
            value={value3}
            onChange={(event, newValue) => {
              setValue3(newValue);
            }}
            // inputValue={specialization}
            onInputChange={(event, newInputValue) => {
              handleSpecialization(newInputValue);
            }}
            id="controllable-states-demo"
            options={props.option3}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label3}
                className="filterInput"
               // placeholder="Enter your specialization"
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={11}
          sm={4}
          md={1}
          lg={1}
          xl={2}
          className="FilterSearchButton"
        >
          <Button
            className="btn"
            style={{ padding: "11px", width: "90%" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileFilter;
