'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getBlogs } from '@/services/blogService';

interface BlogItem {
  id: number;
  image: string;
  title: string;
  text: string;
  link?: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();

        const blogData = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const mappedBlogs: BlogItem[] = blogData.map((blog: any) => ({
          id: blog.id,
          image: blog.image_url || '/images/testimoniesSection/testi1.jpg', 
          title: blog.title || 'Untitled Blog',
          text: blog.description || blog.text || 'No description available.',
          link: `/blogcontent/${blog.id}`,
        }));

        setBlogs(mappedBlogs);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="home-blogs-section text-center">
      <Container>
        <h2 className="home-blogs-title fw-bold mb-5">Blogs</h2>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="dark" />
            <p className="mt-2 text-muted">Loading blogs...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="text-muted">No blogs found.</p>
        )}

        <Row className="justify-content-center g-4 mb-5">
          {blogs.map((blog) => (
            <Col key={blog.id} xs={12} md={6} lg={4}>
              <Card className="home-blogs-card h-100 shadow-lg border-0">
                <div className="home-blogs-image-wrapper position-relative" style={{ height: '250px' }}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="home-blogs-image object-cover rounded-top"
                  />
                </div>
                <Card.Body className="text-dark">
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  <Card.Text className="text-truncate">{blog.text}</Card.Text>
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
