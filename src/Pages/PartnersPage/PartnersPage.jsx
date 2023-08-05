import React, { useState } from "react";

import "./PartnersPage.css";
import Grid from "@mui/material/Grid";
import Header from "../../Components/header/Header";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
//import img from '../../Assets/partnerbanner.png'

function PartnersPage() {
  const [image,setImage]=useState('')
  console.log(image)

  const formData=new FormData()
  formData.append('image',image)
  const handleClick=()=>{
    console.log(image)

    axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/`,
    formData
    ).then((res)=>{
      console.log(res.data)
      
    }).catch((err)=>{
      console.log(err,'error')
    })
  }
  return (
    <div>
      <Header />
      <div className="partnersPageDiv">
        <Grid container spacing={0}>
          <Grid item sx={12} sm={12} md={12} lg={12} className="partnersbg">
            <h1>Our Partners</h1>
          </Grid>
<input type='file'onChange={(e)=>setImage(e.target.value)}/>
<button onClick={handleClick}/>

          <Grid item sx={12} sm={6} md={6} lg={2.5}>
            <div className="partnersCard">
              <div className="img">
                <img
                  src="https://t3.ftcdn.net/jpg/01/64/86/66/240_F_164866613_77ASIuVi8yOyYqVYcLkacyy5YgbAFgoC.jpg"
                  alt=""
                />

                <h2>Organization</h2>
              </div>
            </div>
          </Grid>
          <Grid item sx={12} sm={6} md={6} lg={2.5}>
            <div className="partnersCard">
              <div className="img">
                <img
                  src="https://t3.ftcdn.net/jpg/01/64/86/66/240_F_164866613_77ASIuVi8yOyYqVYcLkacyy5YgbAFgoC.jpg"
                  alt=""
                />

                <h2>Organization</h2>
              </div>
            </div>
          </Grid>
          <Grid item sx={12} sm={6} md={6} lg={2.5}>
            <div className="partnersCard">
              <div className="img">
                <img
                  src="https://t3.ftcdn.net/jpg/01/64/86/66/240_F_164866613_77ASIuVi8yOyYqVYcLkacyy5YgbAFgoC.jpg"
                  alt=""
                />

                <h2>Organization</h2>
              </div>
            </div>
          </Grid>
          <Grid item sx={12} sm={6} md={6} lg={2.5}>
            <div className="partnersCard">
              <div className="img">
                <img
                  src="https://t3.ftcdn.net/jpg/01/64/86/66/240_F_164866613_77ASIuVi8yOyYqVYcLkacyy5YgbAFgoC.jpg"
                  alt=""
                />

                <h2>Organization</h2>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default PartnersPage;
