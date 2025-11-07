'use client';
import React from 'react';
import Hero from './components/heroSlider';
import About from './components/about';
import ProductsSection from './components/productSection';
import TestimonySection from './components/testimonySection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProductsSection />
      <TestimonySection />
    </>
  );
}
