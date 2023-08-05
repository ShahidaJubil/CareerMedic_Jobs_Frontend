import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/header/Header";
import "./BlogPage.css";
import { BlogsData } from "../Blogs/BlogData";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { id } = useParams();
  const blogPost = BlogsData.find((blog) => blog.id === id);

  return (
    <div>
      <Header />
      <div className="blog_banner">
        <h1>{blogPost.title}</h1>
        <br />
        <br />
        <h4>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
          ratione maiores
        </h4>
      </div>
      <div className="content">
        <p>
        {blogPost.content}
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPage;
