import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axios from "axios";
import "./Jobs.css";

function JobIcon(props) {
    const check_job = `${process.env.REACT_APP_BASE_URL}/api/jobs/check`;
    const apply_job = `${process.env.REACT_APP_BASE_URL}/api/jobs/apply`;

    const [response, setResponse] = useState();
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("Apply Now");

    const userId = props.usrID;
    const jobId = props.jobID;

    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const checkJobs = async() => {
            //   const userId = props.usrID;
            //   const jobId = props.jobID;
            const res = await axios
                .post(check_job, {
                    userId: userId,
                    jobId: jobId,
                })
                .then((res) => {
                    console.log("FF", res);
                    setStatus(res.data.status);
                    if (res.data.success === "true") {
                        setFlag(true);
                    } else if (res.data.success === "false") {
                        setFlag(false);
                    } else {
                        setError("Server error");
                        // console.log("SERVER ERRRRR");
                    }
                })
                .catch((error) => {
                    console.log("Jobicon", error);
                });
        };
        checkJobs();
    });

    const handleApply = async(user, job) => {
        // setOpen(true);
        // setSelectedJob(job);
        // console.log("selected", job);
        // var jobId = job._id;
        // const userId = sessionStorage.getItem("uid");
        axios
            .post(apply_job, {
                userId: user,
                jobId: job,
            })
            .then((res) => {
                console.log("Application : Successful");
                console.log("AS", res);
                setApplied(true);
            })
            .catch((err) => {
                console.log("Application : Server Error", err);
            });
    };

    return ( 
    <>
        <
        Button variant = "contained"
        className = "btn"
        onClick = {
            () => handleApply(userId, jobId) } >
        { status } 
        </Button> 
        </>
    );
}

export default JobIcon;