import React, { useEffect, useState } from "react";
import "./Jobs.css";
import Grid from "@mui/material/Grid";
import Header from "../../Components/header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import JobIcon from "./JobIcon";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Jobs() {
  const [datas, setDatas] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

 

  
  console.log(
    "data-location",
    datas.map((hospital) => hospital.location)
  );
  const hospitalSet = new Set(datas.map((hospital) => hospital.hospitalname));
  // Remove empty values and convert them to a list
  const hospitalOptions = ["Hospital", ...hospitalSet].filter(
    (hospital) => hospital && hospital.trim() !== ""
  );

  const locationSet = new Set(datas.map((hospital) => hospital.location));
  const locationOptions = ["Location", ...locationSet];

  const specializationSet = new Set(
    datas.map((hospital) => hospital.specialization)
  );
  const specializationOptions = ["Specialization", ...specializationSet];

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const { posts, data } = useContext(SearchContext);

  useEffect(() => {
    const handleUID = async () => {
      const usr = sessionStorage.getItem("uid");
      setUid(usr);
    };
    handleUID();
  }, []);

  const [Uid, setUid] = useState(sessionStorage.getItem("uid"));

  // Sort the posts array in reverse order
  const sortedPosts = posts.slice().reverse();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle "view more" button click and set the selected job
  const handleViewMoreClick = (job) => {
    setSelectedJob(job);
    setOpen(true); // Open the dialog when "view more" is clicked
  };

 

  return (
    <div>
      <Header />
      <div className="jobs">
        <div className="jobContainer">
          <Grid container spacing={5} className="job_details">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Filter
                option1={hospitalOptions}
                option2={locationOptions}
                option3={specializationOptions}
                label1={"Hospital Name"}
                label2={"Location"}
                label3={"Specialization"}
              />
            </Grid>
            {data &&
              currentPosts.map((item, id) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={id}>
                    <div className="job_container">
                      <div>
                        <h2>{item.job}</h2>
                        <br />
                        <h3>{item.hospitalname}</h3>
                        <p>{item.location}</p>
                      </div>

                      <div className="qualist">
                        <h3>Qualifications </h3>
                        <p>{item.specialization}</p>
                      </div>
                      <div className="qualist">
                        <h3>
                          Experience Required:{" "}
                          <span style={{ fontWeight: "300" }}>
                            {item.experience} years
                          </span>{" "}
                        </h3>
                      </div>
                      <div className="descriptions">
                        <h3>Job Description</h3>
                        <p>{item.details}</p>
                      </div>
                      <br />
                      <div className="jobs_btn">
                        <Button
                          variant="contained"
                          className="view btn"
                          onClick={() => handleViewMoreClick(item)} 
                        >
                          view more
                        </Button>

                        <Dialog
                          fullScreen
                          open={open}
                          onClose={handleClose}
                          TransitionComponent={Transition}
                        >
                       
                          <AppBar sx={{ position: "relative" }} className="job_popup_bar">
                            <Toolbar>
                           <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                              >
                                Close  &nbsp; <CloseIcon />
                              </IconButton>
                            </Toolbar>
                          </AppBar>

                          {selectedJob && (
                            <div className="job_popup_div">
                              <h2>{selectedJob.job}</h2>
                              <br />
                            <span> Hospital Name: &nbsp; <p> {selectedJob.hospitalname}</p></span>
                              <br />
                              <span>Location: &nbsp; <p>{selectedJob.location}</p></span>
                              <br />
                              <span>Qualification: &nbsp; <p>{selectedJob.specialization}</p></span>
                              <br />
                              <span>Experience Required: &nbsp;<p>{selectedJob.experience} years</p></span>
                              <br />
                              <span>Description: &nbsp;<p style={{width:'80%'}}> {selectedJob.details}</p></span>
                              <br />
                              <JobIcon usrID={Uid} jobID={selectedJob._id} />
                            </div>
                          )}
                          
                        </Dialog>

                        <JobIcon usrID={Uid} jobID={item._id} />
                      </div>
                    </div>
                  </Grid>
                );
              })}
            {/* {clearQuery} */}
          </Grid>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <div className="job_ads">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f1b78927827763.5636b65575e40.jpg"
            alt=""
          />
          <br />
          <br />
          <br />
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f1b78927827763.5636b65575e40.jpg"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Jobs;
