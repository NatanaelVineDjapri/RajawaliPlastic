'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getBlogsById } from '@/services/blogService';

const BlogContentHero: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogImage = async () => {
      try {
        const res = await getBlogsById(id);
        const data = res?.data?.data ?? res?.data ?? res;

        if (data?.image_base64) {
          setImage(`data:image/jpeg;base64,${data.image_base64}`);
        } else {
          setImage(null);
        }
      } catch (error) {
        console.error("Hero image fetch failed:", error);
        setImage(null);
      }
    };

    if (id) fetchBlogImage();
  }, [id]);

  return (
    <section
      className="content-hero-section position-relative d-flex align-items-center justify-content-center"
    >
      <div className="content-hero-bg position-absolute top-0 start-0 w-100 h-100">
        <Image
          src={image || "/images/bg_blogs2.png"}
          alt="Blog Background"
          fill
          priority
          className="object-fit-cover content-hero-bg-image"
        />
      </div>

      <div className="content-hero-overlay"></div>

      <Container className="position-relative text-center z-2">
        <div
          className="blog-hero-foreground mx-auto d-flex align-items-center justify-content-center"
        >
          <Image
            src={image || "/images/bg_blogs2.png"}
            alt="Blog Foreground"
            width={800}
            height={450}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Container>
    </section>
  );
};

export default BlogContentHero;
