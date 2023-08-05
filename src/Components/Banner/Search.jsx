import React from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
// import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
// import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
// import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import SearchIcon from '@mui/icons-material/Search';

function Search(props) {
  const {
    handleHospitalname,
    handleLocation,
    handleSpecialization,
    handleSearch,
    clearResponse,
  } = useContext(SearchContext);

  const navigate = useNavigate();

  const inputStyle = {
    backgroundColor: "white", // specify the background color you want here
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      // Enter key code
      event.preventDefault();
      handleSearch();
      navigate("/jobs");
      clearResponse();
    }
  }

  function handleSearchClick() {
    handleSearch();
    navigate("/jobs");
    clearResponse();
  }

  return (
    <div className="searchDiv">
      <div className="form-container">
        <div className="search_hospi">
          <h4>Hospital</h4>
          <br />
          <TextField
         className="searchField"
            id="outlined-basic"
            label="Hospital"
            variant="outlined"
            inputProps={{ style: inputStyle }}
            onChange={(event) => handleHospitalname(event.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <SearchIcon className="search-icon" onClick={handleSearchClick} />
              ),
            }}
          />
        </div>
        <div className="search_spec">
          <h4>Specialization</h4>
          <br />
          <TextField
         className="searchField"
            id="outlined-basic"
            label="Specialization"
            variant="outlined"
            inputProps={{ style: inputStyle }}
            onChange={(event) => handleSpecialization(event.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <SearchIcon className="search-icon" onClick={handleSearchClick} />
              ),
            }}
          />
        </div>
        <div className="search_loc">
          <h4>Location </h4>
          <br />
          <TextField
         className="searchField"
            id="outlined-basic"
            label="Location"
            variant="outlined"
            inputProps={{ style: inputStyle }}
            onChange={(event) => handleLocation(event.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <SearchIcon className="search-icon" onClick={handleSearchClick} />
              ),
            }}
          />
        </div>
        <br />
        <br />
      </div>

      <div>
        <h5>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          excepturi atque
        </h5>
      </div>
    </div>
  );
}

export default Search;
