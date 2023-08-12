import "./Profile.css";
import img1 from "../../Assets/img1.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

import { FcDownload } from "react-icons/fc";

function Profile(props) {
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState([]);
  const [JobsData, setJobsData] = useState([]);
  const [proId, setProId] = useState();
  const [resume, setResume] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pid = sessionStorage.getItem("profId");
        const id = sessionStorage.getItem("uid");
        setProId(pid);
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/user/jobs/` + id
        );
        setJobsData(res.data.jobApplications);

        console.log("rest", res.data.jobApplications);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (jobId) => {
    try {
      const id = sessionStorage.getItem("uid");
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/remove/${id}/${jobId}`
      );

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/jobs/${id}`
      );
      setJobsData(res.data.jobApplications);
    } catch (error) {
      console.log("Remove Application Error:", error);
    }
  };
  //Get profile details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = sessionStorage.getItem("uid");
        const response = await axios.get(
          "http://localhost:5000/api/profile/" + id
        );
        setUser(response);

        console.log("user info", response);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const filename = user?.data?.profile?.image;
  const fullResumeURL = `${process.env.REACT_APP_BASE_URL}/uploads/${filename}`;
  console.log("Full Resume URL:", fullResumeURL); // Log the URL to verify it

  //const fileurl = "http://localhost:5000/api/file/64d5c920eb37fea01daed238";
  const id = sessionStorage.getItem("uid");
  const fileurl = `${process.env.REACT_APP_BASE_URL}/api/resume/` + id;
  const uploadurl = `${process.env.REACT_APP_BASE_URL}/api/upload/resume/` + id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fileurl);
        setUser(response);

        console.log("user file", response);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const UploadResume = () => {
    const formData = new FormData();
    formData.append("file", resume);
    axios
      .post(uploadurl, formData)
      .then((res) => {
        console.log("success", res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Header user={user} role={user?.data?.role} />
      <div className="profile">
        <div className="profile_main">
          <div>
            <div className="profile_banner">
              <img src={img1} alt="" />
            </div>
            <Grid container spacing={5} className="profileDiv">
              <Grid item xs={12} sm={6} md={5} lg={5}>
                <div className="contents">
                  <ul>
                    <li>
                      <h3>
                        {user?.data?.profile?.name} {user?.data?.profile?.lname}
                      </h3>
                    </li>
                    <div className="Profile_list">
                      <li>
                        <h5>
                          Speciality:
                          <span>{user?.data?.profile?.specialization}</span>
                        </h5>
                      </li>
                      <li>
                        <h5>
                          Experience:
                          <span>{user?.data?.profile?.experience} years</span>
                        </h5>
                      </li>
                      {/* <li>
                        <h5>
                          Languages: <span>English, Hindi</span>
                        </h5>
                      </li> */}
                      <ul>
                        <li>
                          <h5>
                            Email:<span> {user?.data?.email}</span>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            Contact: <span>{user?.data?.profile?.contact}</span>
                          </h5>
                        </li>
                      </ul>
                      {/* 
                      <li>
                        <h5>
                          Resume:
                          <span>{user?.data?.profile?.image}</span>
                        </h5>
                      </li> */}
                      {/* {user?.data?.profile?.image && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            console.log("Button Clicked"); // Debug: Check if the click handler is triggered
                            const filename = user.data.profile.image;
                            const fullResumeURL = `${process.env.REACT_APP_BASE_URL}/uploads/${filename}`;

                            console.log("Full Resume URL:", fullResumeURL); // Debug: Log the constructed URL
                            window.open(fullResumeURL, "_self"); //window.open(fullResumeURL, "_blank");
                          }}
                        >
                          Download Resume
                        </Button>
                      )} */}
                      <div className="resume">
                        <label htmlFor="resume">
                          Select your resume {resume && <p>{resume.name}</p>}
                        </label>
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResume(e.target.files[0])}
                        />
                        &nbsp;&nbsp;
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={UploadResume}
                        >
                          Upload Resume
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* Download<FcDownload
                        style={{fontSize:'2rem'}}
                          onClick={() => {
                            window.open(fileurl, "_blank");
                          }}
                        /> */}
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            window.open(fileurl, "_blank");
                          }}
                        >
                          Download &nbsp;&nbsp;<FcDownload/>
                        </Button>
                      </div>
                      <br />
                    </div>
                  </ul>
                </div>
              </Grid>

              <Grid item xs={11} sm={6} md={6} lg={5}>
                <br />
                <div className="jobList">
                  <h3>Jobs Applied</h3>

                  {JobsData.map((item, index) => {
                    if (item.jobId !== null && item.jobId !== undefined) {
                      return (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{item.jobId.job}</Typography>
                          </AccordionSummary>
                          <AccordionDetails className="accordian">
                            <Typography>
                              Hospital name: {item.jobId.hospitalname}
                            </Typography>

                            <button
                              className="remove btn "
                              onClick={() => handleRemove(item.jobId._id)}
                            >
                              Remove
                            </button>
                          </AccordionDetails>
                        </Accordion>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;

// import "./Profile.css";
// import img1 from "../../Assets/img1.jpg";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
// import Footer from "../../Components/Footer/Footer";
// import Header from "../../Components/header/Header";

// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Button } from "@mui/material";

// function Profile(props) {
//   const [details, setDetails] = useState([]);
//   const [user, setUser] = useState([]);
//   const [JobsData, setJobsData] = useState([]);
//   const [proId, setProId] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const pid = sessionStorage.getItem("profId");
//         const id = sessionStorage.getItem("uid");
//         setProId(pid);
//         const res = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/api/user/jobs/` + id
//         );
//         setJobsData(res.data.jobApplications);

//         console.log("rest", res.data.jobApplications);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleRemove = async (jobId) => {
//     try {
//       const id = sessionStorage.getItem("uid");
//       await axios.put(
//         `${process.env.REACT_APP_BASE_URL}/api/remove/${id}/${jobId}`
//       );

//       const res = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/user/jobs/${id}`
//       );
//       setJobsData(res.data.jobApplications);
//     } catch (error) {
//       console.log("Remove Application Error:", error);
//     }
//   };
//   //Get profile details

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const id = sessionStorage.getItem("uid");
//         const response = await axios.get(
//           "http://localhost:5000/api/profile/" + id
//         );
//         setUser(response);

//         console.log("user info", response);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchData();
//   }, []);

//   const filename = user?.data?.profile?.image;
//   const fullResumeURL = `${process.env.REACT_APP_BASE_URL}/uploads/${filename}`;
//   console.log("Full Resume URL:", fullResumeURL); // Log the URL to verify it
//   const [isPdfVisible, setIsPdfVisible] = useState(false);
//   return (
//     <>
//       <Header user={user} role={user?.data?.role} />
//       <div className="profile">
//         <div className="profile_main">
//           <div>
//             <div className="profile_banner">
//               <img src={img1} alt="" />
//             </div>
//             <Grid container spacing={5} className="profileDiv">
//               <Grid item xs={12} sm={6} md={5} lg={5}>
//                 <div className="contents">
//                   <ul>
//                     <li>
//                       <h3>
//                         {user?.data?.profile?.name} {user?.data?.profile?.lname}
//                       </h3>
//                     </li>
//                     <div className="Profile_list">
//                       <li>
//                         <h5>
//                           Speciality:
//                           <span>{user?.data?.profile?.specialization}</span>
//                         </h5>
//                       </li>
//                       <li>
//                         <h5>
//                           Experience:
//                           <span>{user?.data?.profile?.experience} years</span>
//                         </h5>
//                       </li>
//                       {/* <li>
//                         <h5>
//                           Languages: <span>English, Hindi</span>
//                         </h5>
//                       </li> */}
//                       <ul>
//                         <li>
//                           <h5>
//                             Email:<span> {user?.data?.email}</span>
//                           </h5>
//                         </li>
//                         <li>
//                           <h5>
//                             Contact: <span>{user?.data?.profile?.contact}</span>
//                           </h5>
//                         </li>
//                       </ul>

//                       <li>
//                         <h5>
//                           Resume:
//                           <span>{user?.data?.profile?.image}</span>
//                         </h5>
//                       </li>
//                       {user?.data?.profile?.image && (
//           <div>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() => {
//                 setIsPdfVisible(true); // Show the PDF
//               }}
//             >
//               View Resume
//             </Button>
//             {isPdfVisible && (
//               // Show the PDF using an iframe
//               <div className="pdf-container">
//                 <iframe
//                   title="PDF Viewer"
//                   src={fullResumeURL}
//                   style={{ width: '100%', height: '600px' }}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//                     </div>
//                   </ul>
//                 </div>
//               </Grid>

//               <Grid item xs={11} sm={6} md={6} lg={5}>
//                 <br />
//                 <div className="jobList">
//                   <h3>Jobs Applied</h3>

//                   {JobsData.map((item, index) => {
//                     if (item.jobId !== null && item.jobId !== undefined) {
//                       return (
//                         <Accordion key={index}>
//                           <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel1a-content"
//                             id="panel1a-header"
//                           >
//                             <Typography>{item.jobId.job}</Typography>
//                           </AccordionSummary>
//                           <AccordionDetails className="accordian">
//                             <Typography>
//                               Hospital name: {item.jobId.hospitalname}
//                             </Typography>

//                             <button
//                               className="remove btn "
//                               onClick={() => handleRemove(item.jobId._id)}
//                             >
//                               Remove
//                             </button>
//                           </AccordionDetails>
//                         </Accordion>
//                       );
//                     } else {
//                       return null;
//                     }
//                   })}
//                 </div>
//               </Grid>
//             </Grid>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Profile;
