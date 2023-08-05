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

function PostDetails() {
  const url = `${process.env.REACT_APP_BASE_URL}/api/profile/add`;

  const [location, setLocation] = useState("");
  const [image] = useState("");
  const [about, setAbout] = useState("");
  // const [hospitalname, setHospitalname] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const formValues = {
    image,
    about,
    name,
    location,
    contact,
    address,
  };
  const handleSubmit = (e) => {
    const userId = sessionStorage.getItem("uid");
    if (userId) {
      e.preventDefault();
      const requestData = {
        location: location,
        specialization: specialization,
        address: address,
        experience: experience,
        image: image,
        title: about,
        name: name,
        contact: contact,
      };

      const config = {
        params: {
          userId: userId,
        },
      };

      Axios.post(`${url}/${userId}`, requestData, config)
        .then((res) => {
          console.log("success", res);
          // Perform any additional actions on success if needed
        })
        .catch((error) => {
          console.error("error", error);
          // Handle the error here, e.g., display an error message to the user
        })
        .finally(() => {
          setFormErrors(validate(formValues));
          setIsSubmit(true);
        });
    } else {
      console.error("UserId does not exist in session");
      // Handle the error here, e.g., display an error message to the user
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.location) {
      errors.location = "*  ";
    }

    if (!values.name) {
      errors.name = "* ";
    }

    // if (!values.image) {
    //   errors.image = "*";
    // }
    if (!values.about) {
      errors.about = "*";
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

  const [fileName, setFileName] = useState("");

  function handleFileInputChange(event) {
    setFileName(event.target.files[0].name);
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
              {"Upload"}
            </DialogTitle>
            <DialogContent style={{ width: "400px" }}>
              <DialogContentText id="alert-dialog-slide-description">
                Details uploaded successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/">
                <Button
                  onClick={handleClose}
                  style={{
                    backgroundColor: "rgb(214, 45, 90)",
                  }}
                >
                  <Link
                    to="/profile" //if login by user
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
          <h2>Post Details</h2>
          <form action="" onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12} xl={12}>
                <span className="error">{formErrors.job}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="error">{formErrors.name}&nbsp;</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <span className="error">{formErrors.location}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Specialization"
                  variant="standard"
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <span className="error">{formErrors.location}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Experience"
                  variant="standard"
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <span className="error">{formErrors.location}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Location"
                  variant="standard"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <span className="error">{formErrors.location}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <span className="error">{formErrors.location}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Contact"
                  variant="standard"
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <label className="custom-file-upload">
                  <input type="file" onChange={handleFileInputChange} />
                  Upload Image
                  {fileName && (
                    <span className="file-name">
                      : <b>{fileName}</b>
                    </span>
                  )}
                </label>
              </Grid>

              <Grid item lg={1}></Grid>
              <Grid item sm={10} xs={12} lg={10}>
                <span className="error">{formErrors.about}&nbsp;</span>
                <TextField
                  className="largeText"
                  fullWidth
                  id="standard-basic"
                  label="About"
                  variant="standard"
                  multiline
                  maxRows={3}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleClickOpen}
                  className="buttonstyle"
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

export default PostDetails;
