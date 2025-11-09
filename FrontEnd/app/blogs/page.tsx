"use client";
import React from "react";
import SendEmail from "../components/sendEmail"; 
import Footer from "../components/footer";
import BlogContentList from "../components/blogs/blogcontentlist";

const BlogsPage = () => {
  return (
    <main>
      <section
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          backgroundColor: "#ffffff",
          minHeight: "50vh",
        }}
      >
        <h1
          className="fw-bold display-3"
          style={{
            color: "#000000",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Blogs
        </h1>
      </section>
      <BlogContentList/>
      <SendEmail />
      <Footer />
    </main>
  );
};

export default BlogsPage;
