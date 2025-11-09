'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const blogs = [
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Mengenal Perbedaan PP, PE, dan PS!',
    text: 'Tiga bahan, satu tujuan, tapi hasilnya bisa sangat berbeda. Yuk pahami karakter tiap jenis biji plastik sebelum memilih bahan baku Anda...',
    link: '/blogcontent',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Tren Penggunaan Plastik Daur Ulang',
    text: 'Dari limbah jadi peluang, lihatlah bagaimana industri kemasan beralih ke bahan daur ulang tanpa mengorbankan kualitas...',
    link: '/blogcontent',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Inovasi Teknologi Pengolahan Plastik',
    text: 'Teknologi baru dalam pengolahan plastik membuka jalan bagi produksi yang lebih efisien dan ramah lingkungan...',
    link: '/blogcontent',
  },
  {
    image: "/images/testimoniesSection/testi1.jpg",
    title: 'Dampak Sosial Industri Plastik Modern',
    text: 'Perkembangan industri plastik tak hanya berdampak pada lingkungan, tetapi juga membuka peluang ekonomi baru bagi masyarakat...',
    link: '/blogcontent',
  },
];

const BlogContentList: React.FC = () => {
  return (
    <section id="blogs" className="blogs-section text-center">
      <Container>
        <Row className="justify-content-center g-4 mb-5">
          {blogs.map((blog, index) => (
            <Col key={index} xs={12} md={6}>
              <Card className="blogs-card h-100 shadow-lg border-0 d-flex flex-column">
                <div className="blogs-image-wrapper">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="blogs-image"
                  />
                </div>
                <Card.Body className="text-dark d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-bold">{blog.title}</Card.Title>
                    <Card.Text>{blog.text}</Card.Text>
                  </div>
                  <div className="text-end">
                    <Button
                      href={blog.link}
                      size="sm"
                      className="rounded-pill px-3 mt-3 border-0 text-white"
                      style={{
                        background: 'linear-gradient(180deg, #1e3a5f, #0b1e30)',
                      }}
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
