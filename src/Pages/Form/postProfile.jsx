import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./PostJob.css";
import Grid from "@mui/material/Grid";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";
import Button from "@mui/material/Button";
import Axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

function PostProfile() {
  const url = `${process.env.REACT_APP_BASE_URL}/user/profile/`;
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [contact, setContact] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState("");

  const formValues = {
    experience,
    specialization,
    contact,
    title,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(url, {
      experience: experience,
      specialization: specialization,
      address: address,

      cv: fileName,
      title: title,
      contact: contact,
    }).then((res) => {
      console.log("success", res);
    });

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // const handleImage = (e) => {
  //   console.log(e.target.files);
  //   setImage(e.target.files[0]);
  // };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "*";
    }
    if (!values.experience) {
      errors.experience = "*";
    }
    if (!values.specialization) {
      errors.specialization = "*";
    }
    return errors;
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleFileInputChange(event) {
    setFileName(event.target.files[0].name);
  }
  function handleImageInputChange(event) {
    setImage(event.target.files[0].name);
  }
  return (
    <>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            id="dialogbox"
          >
            <DialogTitle style={{ color: "rgb(214, 45, 90)", width: "100px" }}>
              {"Profile"}
            </DialogTitle>
            <DialogContent style={{ width: "400px" }}>
              <DialogContentText id="alert-dialog-slide-description">
                Profile uploaded successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/Profile">
                <Button
                  onClick={handleClose}
                  style={{
                    backgroundColor: "rgb(214, 45, 90)",
                  }}
                >
                  <Link
                    to="/Profile"
                    style={{
                      color: "#F5FFFA",
                    }}
                  >
                    Ok
                  </Link>
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div></div>
      )}
      <Header />
      <div className="outsideDiv">
        <div className="postJobContainer">
          <h2>Post Your Profile</h2>
          <form action="" onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={6} xl={6}>
                <span className="error">{formErrors.title}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Title"
                  variant="standard"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={5}>
                <span className="error">{formErrors.specialization}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Specialization"
                  variant="standard"
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <span className="error">{formErrors.experience}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Experience"
                  variant="standard"
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <span className="error">{formErrors.contact}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={5} xl={5.2}>
                <label className="custom-file-upload">
                  <input type="file" onChange={handleFileInputChange} />
                  Upload Resume
                  {fileName && (
                    <span className="file-name">
                      : <b>{fileName}</b>
                    </span>
                  )}
                </label>
              </Grid>

              {/* <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  className="largeText"
                  fullWidth
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  multiline
                  maxRows={3}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid> */}
              {/* <Grid item xs={12} lg={6}>
                <TextField
                  id="standard-basic"
                  label="Facilities"
                  variant="standard"
                  onChange={(e) => setFacilities(e.target.value)}
                />
              </Grid> */}

              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  type="submit"
                  className="buttonstyle"
                  onClick={handleClickOpen}
                >
                  Upload
                </Button>
                &nbsp;&nbsp;
                <Button variant="contained" className="buttonstyle">
                  <Link to="/" style={{ color: "white" }}>
                    Cancel
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostProfile;
