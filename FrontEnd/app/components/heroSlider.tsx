'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';

const Hero: React.FC = () => {
  return (
    <section
      className="position-relative text-center text-white d-flex align-items-center justify-content-center"
      style={{
        height: '110vh',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <Image
        src="/images/Background_Hero.png"
        alt="Background Hero"
        fill
        priority
        style={{
          objectFit: 'cover',
          zIndex: -1,
          filter: 'brightness(60%)', // biar teks lebih jelas
        }}
      />

      {/* Text content */}
      <Container>
        <h1 className="hero-title">
            <span className="block">Rajawali</span>
            <span className="fw-light">Plastik</span>
        </h1>

        <p className="hero-subtitle">
            Your Trusted Partner in Quality Plastic Pellets
        </p>
       </Container>
    </section>
  );
};

export default Hero;
