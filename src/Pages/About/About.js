import React from "react";
import "./About.css";
import Grid from "@mui/material/Grid";
import aboutimg from '../../Assets/about.avif'
import Header from "../../Components/header/Header";
import Footer from "../../Components/Footer/Footer";

function About() {
  return (
    <div>
      <Header/>
      <Grid container spacing={5} className='about_grid'>
        <Grid item xl={4} lg={7} md={7} sm={11} xs={11.5}>
          <h2>ABOUT US</h2>
        <br />
          <p>
          CareerMEDIC is a unique job portal that provides a meeting place for doctors who are seeking jobs and hospital administrations who are seeking doctors to fill their various positions. A sister concern of StudyMEDIC, we provide assistance to doctors to find jobs in reputed hospitals all over the world from the UK, US, UAE to the Middle East.
          </p>
          <br/>
          <p>
          The portal gives doctors a platform to find the right opportunities across the globe and countries such as the UK, Ireland, the Middle East and the Europe and pursue a promising medical career. The portal lets doctors search for positions based on their preferred specialties, skills, experience and preferred criteria. Showcasing your qualifications makes it easy for hospitals to find you.
          </p>
          <br />
          <p>Hospitals on the other hand can gain access to the best talent pool available and further enhance their efficiency through effective recruitment. Our portal will enable hospitals to find ideal candidates who meet their specific requirements.</p>
          <br />
          <p>We also provide hands-on assistance for those who are planning to migrate to other countries seeking better opportunities. Be a part of this community of doctors and hospitals today and build your future with meaningful career connections. Whether you are embarking on your professional journey or you are looking to make the next big step, we are at your service. Your future beckons.</p>        
        <br />
        </Grid>
        <Grid item xl={4} lg={5} md={4} sm={12} xs={11.5} className="about_img">
          <img src={aboutimg} alt="" />
        </Grid>
      </Grid>
      <Footer/> 
    </div>
  );
}

export default About;
