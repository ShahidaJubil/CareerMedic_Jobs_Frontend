import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";
import "./Hospital.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

function Hospital() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/geteach/job/${id}`
    );
    if (response.status === 200) {
      setData(response.data);
    }
    console.log("respo",response);
  };

  console.log("data",data)
  return (
    <div>
      <Header />
      <div className="hospital_div">
        <div className="img_hospital">
          <img
            src="https://thumbs.dreamstime.com/b/hospital-entrance-emergency-sign-43544491.jpg"
            alt=""
          />
        </div>
        <div className="hospital_careers">
          <h2>
            <b> Careers</b>
          </h2>
          <br />
          <div className="vacancy">
            <ul>
              <h3>
                <b>{data.job}</b>
              </h3>

              <li>
                <b>Job Description</b>
                <br />
                <p>
                {data.details}
                </p>
              </li>
              <br />
              <li>
                <b>Qualification:</b>
                <br />
                <p>MBBS in Medicine</p>
              </li>

              <li>
                <b>Experience required:</b>{data.experience} Years
               
              </li>
            </ul>

            <br />
            <Button variant="contained" className="btn">
              Apply Now
            </Button>
          </div>
          <br />
         
        </div>
        <div className="hospital_details">
          <br />
          <h2>{data.hospitalname}</h2>
          <br />
          {data.location}
    
          <h3>About Hospital</h3>
          <p>
          
          {data.about}
          </p>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Hospital;
