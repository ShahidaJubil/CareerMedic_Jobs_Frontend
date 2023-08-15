
import "./Profile.css";
import img1 from "../../Assets/hospital.png";
import axios from "axios";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import { CleaningServices } from "@mui/icons-material";

function HospitalProfile() {
  const [details, setDetails] = useState([]);
  const [userData, setuserData] = useState([]);
  const [JobsData, setJobsData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobData, setSelectedJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const id = sessionStorage.getItem("hospitalId");
      // console.log("uid", id);
      const url = `${process.env.REACT_APP_BASE_URL}/api/getHosp/` + id;

      try {
        const resp = await axios.get(url);

        setuserData(resp.data);
        console.log("Resp-hospital", resp.data);
        setJobsData(resp.data.postedJobs);
      } catch (err) {
        console.error("Error-", err);
      }
    };
    getData();
  }, []);

  const handleOpenModal = async (jobData) => {
    const jobId = jobData.id;
    setIsLoading(true);
    setSelectedJobData(null);

    try {
      const jobDataResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/geteach/job/${jobId}`
      );
      console.log("JobREp", jobDataResponse);
      setSelectedJobData(jobDataResponse.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsModalOpen(true);
  };

  // const openModal = (job) => {
  //   setSelectedJob(job);
  // };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsLoading(false);
    setSelectedJobData(null);
    setIsModalOpen(false);
  };

  const handleRemove = async (user) => {
    try {
      if (user.userId && selectedJobData.id) {
        const id = user.userId;
        const jobId = selectedJobData?.id;
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/remove/${id}/${jobId}`
        );

        const jobDataResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/geteach/job/${jobId}`
        );
        setSelectedJobData(jobDataResponse.data);
        console.log("selectedJobData", jobDataResponse.data);
      } else {
        console.log("Insufficient Data Provided!!");
      }
    } catch (error) {
      console.log("Remove Application Error:", error);
    }
  };

  const [user, setUser] = useState([]);
  const fileurl = `${process.env.REACT_APP_BASE_URL}/api/resume/` + user.userId;

  const handleDownloadCV = async (userId) => {
    console.log("userIdgg",userId)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/resume/${userId}`,
        { responseType: 'blob' } // Set response type to 'blob'
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cv.pdf'); // Provide a default filename
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Download CV Error:", error);
    }
  };

  console.log("JobsData:", JobsData);
  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile_main">
          <div>
            <div>
              <img src={img1} alt="" className="hospitalImg" />
            </div>
            <Grid container spacing={5} className="job_details">
              <Grid item xs={12} sm={6} md={5} lg={5}>
                <div className="contents">
                  <ul>
                    <li>
                      <h3>{userData?.profile?.name}</h3>
                      <h4>{userData?.profile?.title}</h4>
                    </li>
                    <div className="Profile_list">
                      <li>
                        <h5>
                          Location:
                          <span>{userData?.profile?.location}</span>
                        </h5>
                      </li>
                      <li>
                        <h5>
                          About:
                          <span>{userData?.profile?.about}</span>
                        </h5>
                      </li>
                      <ul>
                        <li>
                          <h5>
                            EMail:<span> {userData.email}</span>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            Contact:
                            <span>{userData?.profile?.contact}</span>
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </Grid>

              <Grid item xs={11} sm={6} md={6} lg={5}>
                <br />
                <div className="jobList">
                  &nbsp;&nbsp;&nbsp;Job Applications
                  <br /> <br />
                  {JobsData.map((item, index) => (
                    // <button key={index} onClick={() => openModal(item)}>
                    //   {item.job}
                    // </button>
                    <>
                      <Button
                        variant="contained"
                        key={index}
                        onClick={() => handleOpenModal(item)}
                      >
                        {item.job}
                      </Button>
                      {}
                    </>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedJobData?.username}
              </Typography>
              {selectedJobData && (
                <div>
                  <Typography>Position: {selectedJobData.job}</Typography>
                  <Typography>
                    Specialization: {selectedJobData.specialization}
                  </Typography>
                  <Typography>
                    Experience: {selectedJobData.experience}
                  </Typography>
                  <Typography>Location: {selectedJobData.location}</Typography>
                  <Typography>About: {selectedJobData.about}</Typography>
                  {selectedJobData.user.map((user, index) => (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`user-details-${index}`}
                        id={`user-details-${index}`}
                      >
                        <Typography>
                          User:{user.userId}
                          <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleDownloadCV(user.userId)}
                      >
                        Download CV
                      </Button>
                      {user.resume && (
                            <div>
                              <p>Resume Path: {user.resume.path}</p>
                              <p>Resume Filename: {user.resume.filename}</p>
                            </div>
                          )}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemove(user)}
                        >
                          Remove
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
      <Footer />
    </>
  );
}

export default HospitalProfile;
