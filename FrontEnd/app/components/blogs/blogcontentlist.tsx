"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getBlogs } from "@/services/blogService";

interface BlogItem {
  id: number;
  image: string;
  title: string;
  text: string;
  link?: string;
}

const BlogContentList: React.FC = () => {
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
          image: blog.image_url || "/images/testimoniesSection/testi1.jpg",
          title: blog.title || "Untitled Blog",
          text: blog.description || blog.text || "No description available.",
          link: `/blogcontent/${blog.id}`,
        }));

        setBlogs(mappedBlogs);
      } catch (err: any) {
        setError(err.message || "Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="page-blogs-section">
      <Container>
        <h2 className="text-center fw-bold mb-5">All Blogs</h2>

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
          <p className="text-center text-muted">No blogs found.</p>
        )}

        <Row className="justify-content-center g-4">
          {blogs.map((blog) => (
            <Col key={blog.id} xs={12} md={6} lg={5}>
              <Card className="page-blogs-card h-100 border-0 shadow-lg overflow-hidden">
                <div
                  className="page-blogs-image-wrapper position-relative"
                  style={{ height: "300px" }}
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="page-blogs-image"
                  />
                </div>
                <Card.Body className="text-dark d-flex flex-column justify-content-between p-4">
                  <div>
                    <Card.Title className="fw-bold mb-2">
                      {blog.title}
                    </Card.Title>
                    <Card.Text className="small text-muted">
                      {blog.text.length > 120
                        ? blog.text.slice(0, 120) + "..."
                        : blog.text}
                    </Card.Text>
                  </div>
                  <div className="text-end">
                    <Button
                      href={`/blogcontent/${blog.id}`}
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
