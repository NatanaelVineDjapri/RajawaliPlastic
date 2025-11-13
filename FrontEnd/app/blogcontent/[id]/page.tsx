"use client";
import React from "react";
import BlogContentText from "../../components/blogcontents/BlogContentText";
import SendEmail from "../../components/sendEmail";
import Footer from "../../components/footer";
import BlogContentHero from "../../components/blogcontents/blogContentHero";
const BlogContentPage = () => {
  return (
    <>
      <BlogContentHero />
      <BlogContentText /> {/* ini udah otomatis ambil useParams() */}
      <SendEmail />
      <Footer />
    </>
  );
};

export default BlogContentPage;
