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
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Tren Penggunaan Plastik Daur Ulang',
    text: 'Dari limbah jadi peluang, lihatlah bagaimana industri kemasan...',
    link: '/blogcontent',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Tren Penggunaan Plastik Daur Ulang',
    text: 'Dari limbah jadi peluang, lihatlah bagaimana industri kemasan...',
    link: '/blogcontent',
  }
];

const BlogContentList: React.FC = () => {
  return (
    <section id="blogs" className="page-blogs-section">
      <Container>
        <Row className="justify-content-center g-4">
          {blogs.map((blog, index) => (
            <Col key={index} xs={12} md={6} lg={5}>
              <Card className="page-blogs-card h-100 border-0 shadow-lg overflow-hidden">
                <div className="page-blogs-image-wrapper position-relative">
                  <Image src={blog.image} alt={blog.title} fill className="page-blogs-image" />
                </div>
                <Card.Body className="text-dark d-flex flex-column justify-content-between p-4">
                  <div>
                    <Card.Title className="fw-bold mb-2">{blog.title}</Card.Title>
                    <Card.Text className="small text-muted">{blog.text}</Card.Text>
                  </div>
                  <div className="text-end">
                    <Button
                      href={blog.link}
                      size="sm"
                      className="rounded-pill px-3 mt-3 border-0 text-white page-blogs-btn"
                    >
                      Read More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BlogContentList;