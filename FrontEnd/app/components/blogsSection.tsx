'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const blogs = [
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Mengenal Perbedaan PP, PE, dan PS!',
    text: 'Tiga bahan, satu tujuan, tapi hasilnya bisa sangat berbeda. Yuk pahami karakter tiap jenis biji plastik sebelum memilih bahan baku Anda...',
    link: '#',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Tren Penggunaan Plastik Daur Ulang',
    text: 'Dari limbah jadi peluang, lihatlah bagaimana industri kemasan beralih ke bahan daur ulang tanpa mengorbankan kualitas...',
    link: '#',
  },
];

const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="blogs-section text-center">
      <Container>
        <h2 className="blogs-title fw-bold mb-5">Blogs</h2>

        <Row className="justify-content-center g-4 mb-5">
          {blogs.map((blog, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="blogs-card h-100 shadow-lg border-0">
                <div className="blogs-image-wrapper">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="blogs-image"
                  />
                </div>
                <Card.Body className="text-dark">
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  <Card.Text>{blog.text}</Card.Text>
                  <Button
                    variant="dark"
                    size="sm"
                    className="rounded-pill px-3"
                    href={blog.link}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          variant="light"
          className="blogs-more-btn fw-bold rounded-pill px-5 py-2 shadow-sm"
        >
          Find More Blogs
        </Button>
      </Container>
    </section>
  );
};

export default Blogs;