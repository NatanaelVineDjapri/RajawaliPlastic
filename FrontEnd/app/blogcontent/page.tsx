"use client";
import BlogContentText from "../components/blogcontents/BlogContentText";
import SendEmail from "../components/sendEmail";
import Footer from "../components/footer";
import BlogContentHero from "../components/blogcontents/blogContentHero";

export default function BlogPage() {
  return (
    <>
      <BlogContentHero />
      <BlogContentText />
      <SendEmail />
      <Footer />
    </>
  );
}
