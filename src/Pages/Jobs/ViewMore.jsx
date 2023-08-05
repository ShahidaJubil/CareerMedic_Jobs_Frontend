import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import logo from '../../Assets/logo.png'


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import './ViewMore.css'
import JobIcon from "./JobIcon";

function ViewMore() {
  const [Uid, setUid] = useState(sessionStorage.getItem("uid"));
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleUID = async () => {
      const usr = sessionStorage.getItem("uid");
      setUid(usr);
    };
    handleUID();
  });

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
    console.log(response);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//console.log("data",data)
  return (
    <div >
     <div className="header_jobDetails">
        <img src={logo} alt="" />
     </div>
<div className="viewMoreContainer">
      <div className="viewJob">
        <div>
          <h2>{data.job}</h2>

          <br />
          <p>{data.location}</p>
        </div>
        <br />
        <p>
          <h3>Qualifications </h3>
          <li>{data.specialization}</li>
        </p>
        <br />
        <p>
          <h3>Salary</h3>
          <li>Not disclosed</li>
        </p>
        <br />
        <p>
          <h3>Job Description</h3>
          <li style={{ width: "75%" }}>{data.details}</li>
        </p>
        <br />
        <p>
          <h3>About Hospital</h3>
          <li>{data.about}</li>
        </p>
        <br />
        <Button variant="contained" className="btn" onClick={handleClickOpen}>
          Apply Now
        </Button>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className="dialog"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Confirm Application"}
          </DialogTitle>
          <DialogContent className="confirmBox">
            <DialogContentText>
              <li> {data.job}</li>
              <li> {data.location}</li>
              <li>{data.specialization}</li>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <JobIcon usrID={Uid} jobID={id} />
          </DialogActions>
        </Dialog>
       
      </div>
      <div className="adContainer">
        <img src="https://png.pngtree.com/png-clipart/20210311/original/pngtree-real-etste-business-social-media-post-and-banner-ads-template-png-image_6055782.jpg" alt="" />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewMore;
