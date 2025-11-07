"use client";
import React from "react";
import Hero from "./components/heroSlider";
import About from "./components/about";
import ProductsSection from "./components/productSection";
import TestimonySection from "./components/testimonySection";
import Blogs from "./components/blogsSection";
import GallerySection from "./components/gallerySection";
import SendEmail from "./components/sendEmail";
import Footer from "./components/footer";

const Page: React.FC = () => {
  return (
    <main>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="products"><ProductsSection /></section>
      <section id="testimonies"><TestimonySection /></section>
      <section id="blogs"><Blogs /></section>
      <section id="gallery"><GallerySection /></section>
      <section id="email"><SendEmail /></section>
      <section id="footer"><Footer /></section>
    </main>
  );
};

export default Page;
