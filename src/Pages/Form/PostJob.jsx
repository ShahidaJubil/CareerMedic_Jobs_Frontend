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
import Autocomplete from "@mui/material/Autocomplete";

function PostJob() {
  const options = [{ title: "General Medicine" }, { title: "Peadiatrics" }];
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.title,
  };

  const url = `${process.env.REACT_APP_BASE_URL}/api/post/job/`;

  const [job, setJob] = useState("");

  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [details, setDetails] = useState("");
  // const [hospitalname, setHospital] = useState("")
  // const [location, setLocation] = useState("")
  const [about, setAbout] = useState("")

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const formValues = {
    job,
    experience,
    specialization,
    details,

  };

  const handleSubmit = async (e) => {
    const hospitalId = sessionStorage.getItem('hospitalId');
    if (!hospitalId) {
      return (
        <>
          {console.log("Bug while posting job")}
          <DialogContent style={{ width: "400px" }}>
            <DialogContentText id="alert-dialog-slide-description">
              No hospital information found.
            </DialogContentText>
          </DialogContent>
        </>
      )
    }
    e.preventDefault();
    await Axios.post(
      url,
      {
        job: job,
        experience: experience,
        specialization: specialization,
        details: details,
        // hospitalname: hospitalname,
        hospitalId: hospitalId,
        // location: location,
        about: about
      },
      { withCredentials: false }
    )
      .then((res) => {
        console.log("response", res);
        setIsSubmit(true);
      })
      .catch((error) => {
        console.log("error:", error);
      });

    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    const errors = {};

    if (!values.job) {
      errors.job = "* ";
    }
    if (!values.experience) {
      errors.experience = "* ";
    }
    if (!values.details) {
      errors.details = "* ";
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
                Job details uploaded successfully
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
                    to="/Jobs"
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
          <h2>Post Requirements</h2>
          <form action="" onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              {/* <Grid item xs={12} lg={12} xl={12}>
                <span className="error">{formErrors.job}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Hospital name"
                  variant="standard"
                  onChange={(e) => setHospital(e.target.value)}
                />
              </Grid> */}
              {/* <Grid item xs={12} lg={12} xl={12}>
                <span className="error">{formErrors.job}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Location"
                  variant="standard"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12} lg={12} xl={12}>
                <span className="error">{formErrors.job}&nbsp;</span>
                <TextField
                  id="standard-basic"
                  label="Job Title"
                  variant="standard"
                  onChange={(e) => setJob(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <span className="error">{formErrors.experience}&nbsp;</span>
                <TextField
                  type="number"
                  id="standard-basic"
                  label="Experience Required"
                  variant="standard"
                  inputProps={{ min: 0 }}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Grid>
              <Grid item xs={0} sm={0} md={1.3} lg={2.2} xl={3.6}></Grid>
              <Grid item xs={10} sm={10} md={7.8} lg={6.2} xl={4}>
                <span className="error">{formErrors.specialization}&nbsp;</span>
                <Autocomplete
                  className="autocomplete"
                  {...defaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Specialization"
                      variant="standard"
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <span className="error">{formErrors.details}&nbsp;</span>
                <TextField
                  className="largeText"
                  id="standard-basic"
                  label="Job Description"
                  variant="standard"
                  multiline
                  maxRows={3}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Grid>
              <Grid item sm={12} xs={12} lg={12}>
                <span className="error">{formErrors.details}&nbsp;</span>
                <TextField
                  className="largeText"
                  id="standard-basic"
                  label="About hospital"
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

export default PostJob;
