import React, { useState, useContext } from "react";
import "./SigninPage.css";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvide";
import { toast } from "react-toastify";

const base_url = `${process.env.REACT_APP_BASE_URL}/api/login`;

function Signin() {
  const { updateContext } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [response, setResponse] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formValues = { password, email };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.post(
      base_url,
      {
        email: email,
        password: password,
      },
      { withCredentials: false }
    )
      .then((res) => {
        console.log("response", res);
        const token = res.data.token;
        const usr_name = res.data.username;
        const role = res.data.role;
        const pro_id = res.data.prof_id;
        const userId = res.data.user_id;

        updateContext(token, usr_name);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", usr_name);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("profId", pro_id);
        sessionStorage.setItem("uid", userId);

        setResponse("Success");
        setIsAuthenticated(true);
        return res.data;
      })
      .catch((error) => {
        setResponse("Invalid Credentials");
        console.log("Login error:", error);
        setIsAuthenticated(false);
        toast.error("invalid Username or Password");
      });

    setFormErrors(validate(formValues));
  };

  // Get authenticated user data function
  function getAuthenticatedUser() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return Promise.reject("No token found");
    }

    return Axios.get("/api/user", { headers: { Authorization: token } }).then(
      (response) => response.data
    );
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      setIsLoggedIn(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required ";
    }

    return errors;
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="loginMain">
      <div className="loginDiv">
        <div className="img-signup"></div>
        <div className="loginContainer">
          <div className="login_contents">
          <h2>User Login</h2>
          <br />
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                id="email"
                placeholder="E-mail"
                margin="normal"
                className="input_login"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "rgb(214, 45, 90)" }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="required">{formErrors.email}</p>

              <TextField
                type="password" //UbA : changed to password from text to remove suggestions from browser.
                placeholder="Password"
                margin="normal"
                className="input_login"
                id="password"
                style={{ color: "red" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon style={{ color: " rgb(214, 45, 90) " }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="required">{formErrors.password}</p>

              <br />
              <Button
                variant="contained"
                className="login_button buttonWidth"
                type="submit"
                onClick={handleClickOpen}
              >
                Login
              </Button>
              <br />
              <br />
              <p>
                Don't have an account?&nbsp;&nbsp;&nbsp;
                <Link
                  to="/signup"
                  style={{ color: "#23BDB8", fontWeight: "600" }}
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
