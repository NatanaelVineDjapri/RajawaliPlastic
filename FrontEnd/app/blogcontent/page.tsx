"use client";
import Image from "next/image";
import BlogContentText from "../components/blogcontents/BlogContentText";
import SendEmail from "../components/sendEmail";
import Footer from "../components/footer";

export default function BlogPage() {
  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "420px" }}>
        <Image
          src="/images/bg_blogs.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <BlogContentText />
      <SendEmail />
      <Footer />
    </>
  );
}
