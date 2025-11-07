'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

const GallerySection: React.FC = () => {
  const images = Array(9).fill('/images/productSection/product-pp.jpg');

  return (
    <section id="gallery" className="gallery-section py-5">
      <Container fluid="md" className="gallery-container">
        <h2 className="gallery-title fw-bold text-center mb-5">
          Gallery
        </h2>

        <Row className="g-4">
          {images.map((src, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="d-flex justify-content-center">
              <div className="gallery-image-wrapper">
                <Image
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="gallery-image"
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GallerySection;
