import React from "react";
import "./List.css";
import img1 from "../../Assets/img1.jpg";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function List() {
  const [data, setData] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    const getJobs = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/get/profile/premium/`
      );
      console.log("Premium Users",response)
      if (response.status === 200) {
        setData(response.data);
      }
    };
    getJobs();
  }, []);

  return (
    <div className="listDiv">
      <h1>Premium</h1>

      <Grid container spacing={4} className="premiumDiv">
        {data &&
          data.map((premiumJobs, index) => {
            return (
              <Grid item xs={11} md={4.5} sm={6} lg={3.3} xl={3.1} key={index}>
                <Link to="/profile">
                  <div className="list">
                    <div className="list_card">
                      <div className="listImg">
                        {
                          
                        }

                        <img src={img1} alt="" />
                      </div>
                      <div className="listContents">
                        <ul>
                          <li>
                            <h4 className="align">{premiumJobs.name}</h4>
                          </li>
                          <li>
                            <p className="align"> {premiumJobs.specialization}</p>
                          </li>
                          <li>
                            <p className="align">Place: {premiumJobs.location}</p>
                          </li>
                          <li>
                            <p className="align">Experience: {premiumJobs.experience}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default List;
