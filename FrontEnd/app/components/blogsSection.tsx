'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const blogs = [
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Mengenal Perbedaan PP, PE, dan PS!',
    text: 'Tiga bahan, satu tujuan, tapi hasilnya bisa sangat berbeda...',
    link: '/blogcontent',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Tren Penggunaan Plastik Daur Ulang',
    text: 'Dari limbah jadi peluang, lihatlah bagaimana industri kemasan...',
    link: '/blogcontent',
  },
];

const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="home-blogs-section text-center">
      <Container>
        <h2 className="home-blogs-title fw-bold mb-5">Blogs</h2>

        <Row className="justify-content-center g-4 mb-5">
          {blogs.map((blog, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="home-blogs-card h-100 shadow-lg border-0">
                <div className="home-blogs-image-wrapper">
                  <Image src={blog.image} alt={blog.title} fill className="home-blogs-image" />
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

        <a
          href="/blogs"
          className="btn btn-light home-blogs-more-btn fw-bold rounded-pill px-5 py-2 shadow-sm"
        >
          Find More Blogs
        </a>
      </Container>
    </section>
  );
};

export default Blogs;