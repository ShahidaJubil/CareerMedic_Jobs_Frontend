// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../../Components/header/Header";
// import Footer from "../../Components/Footer/Footer";
// import "./Jobs.css";
// import { Button } from "@mui/material";

// function JobView() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getJobs();
//   }, []);
//   const getJobs = async () => {
//     const response = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/api/get/jobs`
//     );
//     if (response.status === 200) {
//       setData(response.data);
//     }
//     //console.log("response",response);
//   };
//   return (
//     <div>
//       <Header />

//       <div className="viewJob">
//         <div>
//           <h2>{data?.[1]?.specialization}</h2>

//           <br />
//           <p>{data?.[1]?.location}</p>
//         </div>
//         <p>
//           <h3>Qualifications </h3>
//           <li>{data?.[1]?.specialization}</li>
//         </p>
//         <p>
//           <h3>Salary</h3>
//           <li>Not disclosed</li>
//         </p>
//         <p>
//           <h3>Job Description</h3>
//           <li style={{ width: "75%" }}>{data?.[1]?.details}</li>
//         </p>
//         <p>
//           <h3>About Company</h3>
//           <li>{data?.[1]?.about}</li>
//         </p>
//         <br />
//         <Button variant="contained" className="btn">
//           Apply Now
//         </Button>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default JobView;
