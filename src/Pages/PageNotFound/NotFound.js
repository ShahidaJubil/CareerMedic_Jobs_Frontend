import React from "react";
import "./NotFound.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import img from '../../Assets/notfound.jpg'

function NotFound() {
  return (
    <div className="notfound">
      <Link to="/">
        <Button className="btn">Back to home</Button>
        <br/>
      <img src={img} alt=""/>
      </Link>
    </div>
  );
}

export default NotFound;
