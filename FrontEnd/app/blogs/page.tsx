"use client";
import React from "react";
import SendEmail from "../components/sendEmail"; 
import Footer from "../components/footer";
import BlogContentList from "../components/blogs/blogcontentlist";
import BlogHero from "../components/blogs/blogHero";

const BlogsPage = () => {
  return (
    <main>
      <BlogHero />
      <BlogContentList/>
      <SendEmail />
      <Footer />
    </main>
  );
};

export default BlogsPage;
