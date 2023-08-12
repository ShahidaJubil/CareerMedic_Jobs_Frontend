import React from "react";
import "./Footer.css";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { UilFacebook } from "@iconscout/react-unicons";
import { UilTwitter } from "@iconscout/react-unicons";
import logo from '../../Assets/logo.png'

function Footer() {
  return (
    <div className="footer">
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} sm={12} lg={3.5} xl={2.8} className="footer1">
          <img
            src={logo}
            alt=""
          />
          <ul>
            <span> Find Us on:</span>
            <li>
              <a href="https://www.facebook.com/StudyMEDICacademy/" target="_blank"rel="noreferrer">
              <UilFacebook className="fb_icon" /></a>
            </li>
            <li>
              <a href="https://mobile.twitter.com/StudyMEDIClive" target="_blank"rel="noreferrer">
              <UilTwitter className="twitter_icon" /></a>
            </li>
            <li>
              <a href="https://www.instagram.com/studymedicacademy/?hl=en" target={"_blank"} rel="noreferrer">
              <InstagramIcon className="insta_icon" /></a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UC1KtPKHmiiztvz895BYQvTA" target={"_blank"}rel="noreferrer">
              <YouTubeIcon className="utube_icon" /></a>
            </li>
            <li>
              <a href="https://in.linkedin.com/company/studymedicacademy" target={"_blank"}rel="noreferrer">
              <LinkedInIcon className="in_icon" /></a>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={6} sm={5.2} lg={4} xl={4.8}className="footer2">
          <h3>Reach Us</h3>
          <ul>
            <li>
              <LocationOnIcon className="home_style" />
            </li>
            <li>
              StudyMEDIC Academy Private Ltd. Door No 90 G, N.K.K Plaza
              Pannithadam Road, Kecheri Thrissur Pin: 680501
            </li>
          </ul>
          <ul>
            <li>
              <PhoneEnabledIcon className="home_style" />
            </li>

            <li>
              +91 9094200800
              <br />
              +971 54 771 9424 (UAE)
            </li>
          </ul>
          <ul>
            <li>
              <MailIcon className="home_style" />
            </li>
            <li>sales@studymedic.com info@studymedic.com</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={2} sm={2.5} lg={2} xl={1.6} className="footer3">
          <ul className="foot2">
            <br /><br />
            <Link to="/">
              <li>Home</li>
            </Link>
            {/* <Link to="/RegisterForm">
            <li>Sign up</li></Link>
            <Link to="/Login">
              <li>Sign In</li>
            </Link> */}
            <Link to="/About">
              <li>About</li>
            </Link>
            <Link to="/BlogsList">
              <li>Blogs</li>
            </Link>

            {/* <li>Events</li> */}
          </ul>
        </Grid>
        <Grid item xs={12} md={3} sm={4} lg={2.5}xl={2} className="footer3">
          <ul>
            <br />
            <br />
            <li>Data and intellectual Policy</li>
            <li>Terms and Conditions</li>
            {/* <li>Refund Policy</li>
            <li>Sitemap</li> */}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
