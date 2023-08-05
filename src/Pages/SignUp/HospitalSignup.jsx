import React, { useEffect, useState } from "react";
import "../SignIn/SigninPage.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/addHosp`;

function HospitalRegisterForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const formValues = {
    password,
    email,
    name,
    cpassword,
    contact,
    address,
    location,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(base_url, formValues)
  .then((res) => {
    console.log("success", res);
    // Handle successful response here if needed
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
      errors.email = "*";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.name) {
      errors.name = "*";
    }

    if (!values.contact) {
      errors.contact = "*";
    }

    if (!values.location) {
      errors.location = "*";
    }

    if (!values.password) {
      errors.password = "*";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    }
    if (!values.cpassword) {
      errors.cpassword = "*";
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
      <div className="loginDiv">
        <div className="img-signup"></div>
        <div>
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
                  <Link to="/hospital/login">
                    <Button
                      onClick={handleClose}
                      style={{
                        backgroundColor: "rgb(214, 45, 90)",
                      }}
                    >
                      <Link
                        to="/hospital/login"
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

          <div className="login_contents">
            <h2>Register Hospital</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <span className="required">{formErrors.name}</span>
              <input
                className="uk-input"
                type="text"
                placeholder="Hospital Name"
                aria-label="Input"
                onChange={(e) => setName(e.target.value)}
              ></input>

              <span className="error-pwd">{formErrors.email}</span>
              <input
                className="uk-input"
                type="text"
                placeholder="E-mail"
                aria-label="Input"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <br />
              <span className="error-pwd">{formErrors.location}</span>
              <input
                className="uk-input"
                type="text"
                placeholder="Location"
                aria-label="Input"
                onChange={(e) => setLocation(e.target.value)}
              ></input>

              <span className="required">{formErrors.contact}</span>
              <input
                className="uk-input"
                type="text"
                name="contact"
                placeholder="Contact"
                aria-label="Input"
                onChange={(e) => setContact(e.target.value)}
              ></input>

              <br />
              <span className="required">{formErrors.address}</span>
              {/* <input
                className="uk-input"
                name="address"
                type="text"
                placeholder="About"
                aria-label="Input"
                onChange={(e) => setAddress(e.target.value)}
                // style={{ width: "86%" }}
              ></input> */}
              {/* <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="49"
                placeholder=" About"
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              <br /> */}
              <span className="error-pwd">{formErrors.password}</span>
              <input
                className="uk-input"
                type="password"
                placeholder="Password"
                aria-label="Input"
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <span className="error-pwd">{formErrors.cpassword}</span>
              <input
                className="uk-input"
                type="password"
                placeholder="Confirm Password"
                aria-label="Input"
                onChange={(e) => setCpassword(e.target.value)}
              ></input>

              <br />
              <br />

              <Button
                variant="contained"
                className="login_button"
                type="submit"
                onClick={handleClickOpen}
              >
                Sign Up
              </Button>
              <br />
              <br />
              <p>
                Already have an account?&nbsp;&nbsp;&nbsp;
                <Link
                  to="/hospital/login"
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

export default HospitalRegisterForm;
