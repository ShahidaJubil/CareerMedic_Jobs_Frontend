import React, { useEffect } from "react";
import "./Blog.css";
import Grid from "@mui/material/Grid";
import img from "../../Assets/img2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";
import { BlogsData } from "./BlogData";

function Blog() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="blog_main">
      <Header />
      <h2 className="blog_title">Top Hospitals</h2>
      <Grid container spacing={5}>
        {BlogsData.map((data, index) => {
          return (
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
              <div data-aos="fade-up">
                <div className="blogDiv">
                  <img src={img} alt="" />
                  <br /><br />
                  <h2>{data.title}</h2>
                  <br />
                  <p>{data.content}</p>
                  <br />
                  <Link
                     to={`/blogs/${data.id}`}
                  >
                    Read more...
                  </Link>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <Footer />
    </div>
  );
}

export default Blog;
