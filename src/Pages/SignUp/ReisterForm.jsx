import React, { useEffect, useState } from "react";
import "../SignIn/SigninPage.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/signup`;
const base_profile = `${process.env.REACT_APP_BASE_URL}/api/profile/add`;

function RegisterForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [experience, setExperience] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [designation, setDesignation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [cv, setCv] = useState("");

  const formValues = {
    password,
    email,
    name,
    lname,
    cpassword,
    specialization,
    experience,
    contact,
    address,
    location,
    cv,
    designation,
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append form values to the formData object
    formData.append("name", name);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("designation", designation);
    formData.append("specialization", specialization);
    formData.append("experience", experience);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("cpassword", cpassword);
    formData.append("cv", cv); // Append the CV file to the formData

    // Send the FormData object with the CV to the server
    Axios.post(base_url, formData)
      .then((res) => {
        console.log("success", res);
        // Handle successful response here if needed
        setOpen(true); // Optionally, you can set the state to open the dialog box here.
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setFormErrors({ email: "This email is already registered" });
        } else {
          console.error(error);
        }
      });

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Enter your email";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.name) {
      errors.name = "Enter your name";
    }
    if (!values.specialization) {
      errors.specialization = "Enter your specialization";
    }
    if (!values.contact) {
      errors.contact = "This field is Required";
    }
    if (!values.experience) {
      errors.experience = "This field is Required";
    }
    if (!values.location) {
      errors.location = "This field is Required";
    }
    if (!values.designation) {
      errors.designation = "This field is Required";
    }
    if (!values.password) {
      errors.password = "This field is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "This field is Required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match";
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

  return (
    <div className="loginMain">
      <div className="SignupDiv">
        <div className="img-signup"></div>
        <div>
          {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                id="dialogbox"
              >
                <DialogTitle
                  style={{ color: "rgb(214, 45, 90)", width: "100px" }}
                >
                  Sign up
                </DialogTitle>
                <DialogContent style={{ width: "400px" }}>
                  <DialogContentText id="alert-dialog-slide-description">
                    Successfully signed up
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/login">
                    <Button
                      onClick={handleClose}
                      style={{
                        backgroundColor: "rgb(214, 45, 90)",
                      }}
                    >
                      <Link
                        to="/login"
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
          )} */}

          <div className="login_contents">
            <h2>Register User</h2>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> First Name
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    {formErrors.name && (
                      <span className="error-pwd">{formErrors.name}</span>
                    )}
                  </div>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label=" Last Name"
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Email
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    {formErrors.email && (
                      <span className="error-pwd">{formErrors.email}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Location
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    {formErrors.location && (
                      <span className="error-pwd">{formErrors.location}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Designation
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                    <br />
                    {formErrors.designatione && (
                      <span className="error-pwd">
                        {formErrors.designation}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Specialization
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                    <br />
                    {formErrors.specialization && (
                      <span className="required">
                        {formErrors.specialization}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Experience
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setExperience(e.target.value)}
                    />
                    <br />
                    {formErrors.experience && (
                      <span className="required">{formErrors.experience}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Contact
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <br />
                    {formErrors.contact && (
                      <span className="required">{formErrors.contact}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={.6} md={6} sm={12} xs={12}></Grid>
                <Grid item lg={4.7} md={6} sm={12} xs={12}>
                  <div className="uk-margin resumeField">
                    <label htmlFor="resume">Resume</label>
                    <input
                      className="resumeUpload"
                      id="resume"
                      type="file"
                      onChange={(e) => setCv(e.target.files[0])}
                    />
                    {cv && <p>{cv.name}</p>}
                    <br />
                    {formErrors.cv && (
                      <span className="error-pwd">{formErrors.cv}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Password
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    {formErrors.password && (
                      <span className="required">{formErrors.password}</span>
                    )}
                  </div>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="uk-margin">
                    <TextField
                      id="standard-basic"
                      label={
                        <>
                          <span style={{ color: "red" }}>*</span> Confirm password
                        </>
                      }
                      variant="standard"
                      type="text"
                      aria-label="Input"
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                    <br />
                    {formErrors.cpassword && (
                      <span className="required">{formErrors.cpassword}</span>
                    )}
                  </div>
                </Grid>
              </Grid>
              {/* <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                type="text"
                aria-label="Input"
                onChange={(e) => setName(e.target.value)}
              /> */}
              {/* <input
                className="uk-input"
                type="text"
                placeholder="First Name"
                aria-label="Input"
                onChange={(e) => setName(e.target.value)}
              ></input> */}
              {/* &nbsp; &nbsp; &nbsp;
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                aria-label="Input"
                type="text"
                onChange={(e) => setLName(e.target.value)}
              /> */}
              {/* <div>
                <TextField
                  id="standard-basic"
                  label="E-mail"
                  variant="standard"
                  aria-label="Input"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <span className="error-pwd">{formErrors.email}</span>
              </div> */}
              {/* <div>
                <TextField
                  id="standard-basic"
                  label="Location"
                  variant="standard"
                  aria-label="Input"
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="error-pwd">{formErrors.location}</span>
              </div> */}
              {/* <span className="error-pwd">{formErrors.designation}</span>
              <TextField
                id="standard-basic"
                label="Designation"
                variant="standard"
                aria-label="Input"
                type="text"
                onChange={(e) => setDesignation(e.target.value)}
              />
              &nbsp; &nbsp; &nbsp; */}
              {/* <span className="required">{formErrors.specialization}</span>
              <span>*</span>{" "}
              <TextField
                id="standard-basic"
                label="Specialization"
                variant="standard"
                aria-label="Input"
                type="text"
                onChange={(e) => setSpecialization(e.target.value)}
              /> */}
              {/* <span className="required">{formErrors.experience}</span>
              <TextField
                id="standard-basic"
                label="Experience"
                variant="standard"
                aria-label="Input"
                type="text"
                onChange={(e) => setExperience(e.target.value)}
              />
              &nbsp; &nbsp; &nbsp; */}
              {/* <span className="required">{formErrors.contact}</span>
              <TextField
                id="standard-basic"
                label="Contact"
                variant="standard"
                aria-label="Input"
                type="text"
                onChange={(e) => setContact(e.target.value)}
              />
              <span className="required">{formErrors.address}</span> */}
              {/* <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                placeholder=" Career Summary"
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

               */}
              &nbsp; &nbsp; &nbsp;
              {/* <input
                id="resume"
                style={{ border: "2px solid red" }}
                className="uk-input"
                type="file"
                placeholder="Attach your cv"
                aria-label="Input"

              /> */}
              {/* {cv && <p>Selected CV: {cv.name}</p>} */}
              {/* <span className="error-pwd">{formErrors.password}</span>
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                aria-label="Input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="error-pwd">{formErrors.cpassword}</span>
              <TextField
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
                aria-label="Input"
                type="password"
                onChange={(e) => setCpassword(e.target.value)}
              /> */}
              {/* <label htmlFor="cv">CV</label>
<input id="cv" type="file"   onChange={(e) => setCpassword(e.target.value)}/> */}

<br />
              <Button
                variant="contained"
                className="login_button"
                type="submit"
                onClick={handleClickOpen}
              >
                Sign Up
              </Button>
              <br /><br />
              <p>
                Already have an account?&nbsp;&nbsp;&nbsp;
                <Link
                  to="/login"
                  style={{ color: "#23BDB8", fontWeight: "600" }}
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
