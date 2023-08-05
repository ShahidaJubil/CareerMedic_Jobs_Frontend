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
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <br/>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quam
            reprehenderit consequatur quidem blanditiis suscipit! Veritatis
            laborum, excepturi omnis aliquam, error aspernatur aperiam numquam
            expedita dolor vitae quasi fugiat ut. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Saepe tempora eligendi quidem aut est
            accusamus perferendis neque asperiores soluta sed. Impedit adipisci,
            maiores nostrum excepturi eaque voluptates a recusandae quam!
          </p>
          <br/>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quam
            reprehenderit consequatur quidem blanditiis suscipit! Veritatis
            laborum, excepturi omnis aliquam, error aspernatur aperiam numquam
            expedita dolor vitae quasi fugiat ut. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Saepe tempora eligendi quidem aut est
            accusamus perferendis neque asperiores soluta sed. Impedit adipisci,
            maiores nostrum excepturi eaque voluptates a recusandae quam!
          </p>
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
