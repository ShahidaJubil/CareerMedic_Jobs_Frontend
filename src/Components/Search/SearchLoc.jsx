import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";


function SearchLoc() {
  const [className, setClassName] = useState("default-class");
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
      return value.location.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
    setClassName("new-class");
  };
  const handleClearClick = () => {
    setFilteredData("");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/postRequirement/`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  return (
    <div>
      <div className="searchInput">
        <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            onChange={handleFilter}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            {filteredData.length !== 0 ? (
              <CloseIcon onClick={handleClearClick} />
            ) : (
              <SearchIcon onClick={handleFilter} />
            )}
          </IconButton>
        </Paper>
      </div>

      {filteredData.length !== 0 && (
        <div className={className}>
          {Array.from(new Set(filteredData.map((item) => item.location))).map(
            (location, index) => {
              console.log(location, "search");
              const matchingItems = filteredData.filter(
                (item) => item.location === location
              );
              return (
                <Link
                  to={`/view/job/${matchingItems[0].id}`}
                  target="_blank"
                  className="dataItem"
                  key={index}
                >
                  <p> {location}</p>
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default SearchLoc;
