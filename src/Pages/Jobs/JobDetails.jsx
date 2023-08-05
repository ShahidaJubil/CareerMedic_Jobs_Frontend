import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/header/Header";
import JobIcon from "./JobIcon";

function JobDetailsPage() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/geteach/job/${id}`
      );
      if (response.status === 200) {
        setJobDetails(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Header/>
        <div>
      <h2>{jobDetails.job}</h2>
      {/* Display other job details here */}
      {/* <JobIcon usrID={Uid} jobID={props.id} /> */}
      </div>
    </div>
  );
}

export default JobDetailsPage;
