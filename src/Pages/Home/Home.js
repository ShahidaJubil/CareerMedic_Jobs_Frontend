import React from "react";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import List from "../../Components/List/List";
import Partners from "../../Components/partners/Partners";
import Slider2 from "../../Components/Slider2/Slider2";
import Slideshow from "../../Components/Slideshow/Slideshow";
import PartnerHome from "../Blogs/PartnerHome";
import SpecSlideshow from "../../Components/Speicalization-Slideshow/SpecSlider";
import { Divider } from "@mui/material";
import Ad from '../../Components/Ad/Ad.jsx'

function Home() {
  return (
    <div>
      <Banner />
      <Slideshow />
      <Slider2 />
      <Divider/>
      <Divider/>
      <Ad/>
      <Divider/>
      <Divider/>
      <List />
      {/* <SpecSlideshow/> */}
      <PartnerHome/>
      <Divider/>
      <Divider/>
      <Ad/>
      <Divider/>
      <Divider/>
      <Partners />
      <Footer />
    </div>
  );
}

export default Home;
