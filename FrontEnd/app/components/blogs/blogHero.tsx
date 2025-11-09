'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';

const BlogHero: React.FC = () => {
  return (
    <section className="page-blogs-hero position-relative d-flex align-items-center justify-content-center text-center text-white">
      <div className="page-blogs-hero-bg position-absolute top-0 start-0 w-100 h-100">
        <Image
          src="/images/Background_Hero.png"
          alt="Blog Hero Background"
          fill
          priority
          className="object-fit-cover"
          style={{ filter: 'brightness(80%)' }}
        />
      </div>

      <Container className="position-relative z-2">
        <h1 className="hero-title">Blogs</h1>
      </Container>
    </section>
  );
};

export default BlogHero;
