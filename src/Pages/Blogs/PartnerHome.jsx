import React, { useEffect } from "react";
import "./Blog.css";
import Grid from "@mui/material/Grid";
import img from "../../Assets/img2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { BlogsHomeData } from "./BlogsHomeData";

function PartnerHome() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="blog_main">
      <h2 className="Title">Top Hospitals</h2>
      <br /><br />
      <Grid container spacing={5}>
        {BlogsHomeData.map((data, index) => {
          return (
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
              <div data-aos="fade-up">
                <div className="blogDiv">
                  <img src={img} alt="" />
                  <br />
                  <br />
                  <h2>{data.title}</h2>
                  <br />
                  <p>{data.content}</p>
                  <br />
                  <Link to={`/blogs/${data.id}`}>Read more...</Link>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <br />
      <Link to="/blogslist">
        View More <DoubleArrowIcon className="arrow" />
      </Link>
    </div>
  );
}

export default PartnerHome;
