'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import "../../globals.css";

const BlogContentHero: React.FC = () => {
  return (
    <section className="content-hero-section position-relative d-flex align-items-center justify-content-center">
      <div className="content-hero-bg position-absolute top-0 start-0 w-100 h-100">
        <Image
          src="/images/bg_blogs2.png"
          alt="Blog Background"
          fill
          priority
          className="object-fit-cover content-hero-bg-image"
        />
      </div>
      <div className="content-hero-overlay"></div>
      <Container className="position-relative text-center z-2">
        <div className="content-hero-image-wrapper mx-auto">
          <Image
            src="/images/bg_blogs2.png"
            alt="Blog Foreground"
            width={800}
            height={450}
            className="content-hero-image"
          />
        </div>
      </Container>
    </section>
  );
};

export default BlogContentHero; 