import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DemoData from "../../DemoData.json";
import axios from "axios";
//import SearchIcon from "@mui/icons-material/Search";

function Search_header() {

const BASE_URL=process.env.REACT_APP_BASE_URL

  
  const [search, setSearch] = useState("");
  console.log(DemoData);


  const [data, setData] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const response = await axios.get(
      `${BASE_URL}/user/postRequirement`
    );
    if (response.status === 200) {
      setData(response.data);
    }
    console.log(response);
  };
  return (
    <div>
      <form action="">
        <TextField
          label={"search..."}
          id="outlined-adornment-password"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />

      </form>
      {data.filter((item) => {
        return search.toLowerCase() === ""
          ? item
          : item.toLowerCase().includes(search);
        //&&
        //item.location.toLowerCase().includes(search);
      }).map((item, index) => (
        <div className="search_result_div" key={index}>
      
          <p>{item.location}</p>
          <p>{item.specialization}</p>
          <br />
        </div>
      ))}
       {/* {DemoData.filter((item) => {
        return search.toLowerCase() === ""
          ? item
          : item.location.toLowerCase().includes(search);
        //&&
        //item.location.toLowerCase().includes(search);
      }).map((item, index) => (
        <div className="search_result_div">
          <p>{item.hospital}</p>
          <p>{item.location}</p>
          <p>{item.specialization}</p>
          <br />
        </div>
      ))}

{DemoData.filter((item) => {
        return search.toLowerCase() === ""
          ? item
          : item.specialization.toLowerCase().includes(search);
        //&&
        //item.location.toLowerCase().includes(search);
      }).map((item, index) => (
        <div className="search_result_div">
          <p>{item.hospital}</p>
          <p>{item.location}</p>
          <p>{item.specialization}</p>
          <br />
        </div>
      ))} */}
    </div>
  );
}

export default Search_header;
