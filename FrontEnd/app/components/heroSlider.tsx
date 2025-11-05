'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

const images = [
  '/images/Background_Hero.png',
  '/images/Background_Hero2.png',
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <section
      className="position-relative text-center text-white d-flex align-items-center justify-content-center"
      style={{
        height: '110vh',
        overflow: 'hidden',
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'black' }}
          >
            <Image
              src={images[index]}
              alt="Hero Background"
              fill
              priority
              style={{
                objectFit: 'cover',
                filter: 'brightness(90%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

      </div>

      <Container>
        <h1 className="hero-title">
          <span className="block">Rajawali</span>
          <span className="fw-light">Plastik</span>
        </h1>
        <p className="hero-subtitle">
          Your Trusted Partner in Quality Plastic Pellets
        </p>
      </Container>

      <button
        onClick={prevSlide}
        className="position-absolute top-50 start-0 translate-middle-y btn btn-link text-white fs-1"
        style={{ zIndex: 2 }}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-white fs-1"
        style={{ zIndex: 2 }}
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default Hero;
