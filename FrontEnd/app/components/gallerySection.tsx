'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getGalleries } from '@/services/galleryService'; // pastikan path-nya bener ya bro

interface GalleryItem {
  id: number;
  image_url: string;
  title?: string;
}

const GallerySection: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await getGalleries();
        // asumsi struktur data: { message: "...", data: [ { id, image_url, ... } ] }
        setGalleries(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load galleries');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <section id="gallery" className="gallery-section py-5">
      <Container fluid="md" className="gallery-container">
        <h2 className="gallery-title fw-bold text-center mb-5">
          Gallery
        </h2>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {error && (
          <p className="text-danger text-center">{error}</p>
        )}

        {!loading && !error && (
          <Row className="g-4">
            {galleries.length > 0 ? (
              galleries.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                  <div className="gallery-image-wrapper position-relative" style={{ width: '100%', height: '250px' }}>
                    <Image
                      src={item.image_url}
                      alt={item.title || `Gallery ${item.id}`}
                      fill
                      className="gallery-image"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center">No gallery images found.</p>
            )}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default GallerySection;
