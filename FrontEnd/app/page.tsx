"use client";
import React from "react";
import Hero from "./components/heroSlider";
import About from "./components/about";
import ProductsSection from "./components/productSection";
import TestimonySection from "./components/testimonySection";

const Page: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <ProductsSection />
      <TestimonySection />
    </main>
  );
};

export default Page;
