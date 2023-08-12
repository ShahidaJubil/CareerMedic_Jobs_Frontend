import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Profiles.css";
import Header from "../../Components/header/Header";
import Filter from "../Jobs/Filter";
import Footer from "../../Components/Footer/Footer";

import { useContext } from "react";
import { ProfileSearchContext } from "../../Context/profileSearchContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import Pagination from "../Jobs/Pagination";
import ProfileFilter from "./ProfileFilter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profiles() {
  const [datas, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profiles/posted`);
  //       if (response.status === 200) {
  //         setData(response.data);
  //       }
  //       console.log("resp_profiles-posted", response);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const {

    posts,
    data,
  } = useContext(ProfileSearchContext);

  const experienceSet = new Set(
    data.map((profile) => profile.profile.experience)
  );
  // Remove empty values and convert them to a list
  const experienceOptions = ["Experience", ...experienceSet].filter(
    (hospital) => hospital && hospital.trim() !== ""
  );

  const locationSet = new Set(data.map((profile) => profile.profile.location));
  const locationOptions = ["Location", ...locationSet];

  const specializationSet = new Set(
    data.map((profile) => profile.profile.specialization)
  );
  // Remove empty values and convert them to a list
  const specializationOptions = ["Specialization", ...specializationSet].filter(
    (profile) => profile && profile.trim() !== ""
  );
  //const specializationOptions = ["Specialization", ...specializationSet];

  const sortedPosts = posts.slice().reverse();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle "view more" button click and set the selected job
  const handleViewMoreClick = (job) => {
    setSelectedJob(job);
    setOpen(true); // Open the dialog when "view more" is clicked
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <h2 style={{ padding: "1% 4%" }}>
        <b>Profiles</b>
      </h2>
      {/* <ProfileFilter
        option1={locationOptions}
        option2={specializationOptions}
        option3={experienceOptions}
        label1={"Location"}
        label2={"Specialization"}
        label3={"Experience"}
      /> */}
      <br />
      <br />
      <br />
      <div className="profileDiv_main">
        <Grid container spacing={5} className="profile_details_main">
          {Array.isArray(data) &&
            currentPosts.map((item, id) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={id}>
                <div className="job_container profiles">
                  <h3>
                    {item.profile.name} {item.profile.lname}
                  </h3>

                  <p>Email: {item.email}</p>
                  <p>Location: {item.profile.location}</p>

                  <p>Qualifications : {item.profile.specialization}</p>
                  <div className="subProfiles">
                    <p>Experience : {item.profile.experience}</p>
                    <button
                      className="btn"
                      onClick={() => handleViewMoreClick(item)}
                    >
                      View more
                    </button>
                  </div>

                  <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      className="job_popup_bar"
                    >
                     <div>
                        <h2>&nbsp;&nbsp;&nbsp;&nbsp; Profile Details</h2></div>
                        <div>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                       <CloseIcon />
                        </IconButton>
                        </div>
                    </AppBar>

                    {selectedJob && (
                      <div className="job_popup_div">
                        <h2>{selectedJob.job}</h2>
                        <br />
                        <span>
                          {" "}
                          Name: &nbsp;{" "}
                          <p>
                            {" "}
                            {selectedJob.profile.name}{" "}
                            {selectedJob.profile.lname}
                          </p>
                        </span>
                        <br />
                        <span>
                          Location: &nbsp; <p>{selectedJob.profile.location}</p>
                        </span>
                        <br />
                        <span>
                          Qualification: &nbsp;{" "}
                          <p>{selectedJob.profile.specialization}</p>
                        </span>
                        <br />
                        <span>
                          Experience Required: &nbsp;
                          <p>{selectedJob.profile.experience} years</p>
                        </span>
                        <br />
                        <span>
                          Description: &nbsp;
                          <p style={{ width: "80%" }}>
                            {" "}
                            {selectedJob.profile.title}
                          </p>
                        </span>
                        <br />
                      </div>
                    )}
                  </Dialog>
                </div>
              </Grid>
            ))}
        </Grid>

        <div className="ad_profile">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f1b78927827763.5636b65575e40.jpg"
            alt=""
          />
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Profiles;
