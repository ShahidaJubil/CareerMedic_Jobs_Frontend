// import React from 'react'
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'


// function ForgotPassword() {
//     const [email, setEmail] = useState()
//     const navigate = useNavigate()

//     axios.defaults.withCredentials = true;
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post(`${process.env.REACT_APP_BASE_URL}/api/forgot-password`, {email})
//         .then(res => {
//             if(res.data.Status === "Success") {
//                 navigate('/login')
               
//             }
//         }).catch(err => console.log(err))
//     }

//     return(
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h4>Forgot Password</h4>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Send
//           </button>
//           </form>
        
//       </div>
//     </div>
//     )
// }

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import "./SigninPage.css";
import img from "../../Assets/forgot.png";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to handle the "Forgot Password" request
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/forgot-password`,
        {
          email: email,
          newPassword: newPassword,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setMessage("Error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgotMain">
      <div className="forgotSub">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div>
          <h3>
            <b> Forgot Password</b>
          </h3>

          <form onSubmit={handleSubmit}>
            <div>
              <legend className="uk-legend">Email</legend>

              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="email"
                  placeholder="Email"
                  aria-label="Input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
            </div>
            <div>
              <legend className="uk-legend">New Password</legend>

              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="password"
                  placeholder="Password"
                  aria-label="Input"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
<br />
            <div>
              <legend className="uk-legend">Confirm Password</legend>

              <div className="uk-margin forgotInput">
                <input
                  className="uk-input "
                  type="password"
                  placeholder="Password"
                  aria-label="Input"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
<br />
            <button type="submit" className="resetButton">
              Reset Password
            </button>
        
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<Link to="/login" style={{ color: "#23BDB8", fontWeight: "600", fontSize:'13px' }}>
              Back to Login
              </Link>
        
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

