'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Spinner, Alert } from 'react-bootstrap';
import { getBlogsById } from '@/services/blogService';

interface BlogDetail {
  id: number;
  title: string;
  content?: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

const BlogContentText: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ✅ ini aja ubahannya bro
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid blog ID.');
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await getBlogsById(id); // ✅ udah aman, gak merah lagi
        const data = res?.data?.data ?? res?.data ?? res;

        if (!data) throw new Error('Data blog tidak ditemukan.');
        setBlog(data);
      } catch (err: any) {
        console.error('Fetch blog error:', err);
        setError(err?.message || 'Gagal mengambil data blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-2 text-light opacity-75">Loading blog...</p>
      </div>
    );
  }

  // ⚠️ error
  if (error) {
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );
  }

  // 🚫 jika data kosong
  if (!blog) {
    return <p className="text-center text-white mt-5">Blog tidak ditemukan.</p>;
  }

  // ✅ tampilkan konten
  return (
    <section className="content-blog-section py-5">
      <div className="container text-white" style={{ maxWidth: '720px' }}>
        <h1 className="text-center fw-bold mb-1">{blog.title}</h1>

        {blog.created_at && (
          <p className="text-center text-light opacity-75 mb-4">
            {new Date(blog.created_at).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {blog.image_url && (
          <div className="text-center mb-4">
            <Image
              src={blog.image_url}
              alt={blog.title}
              width={800}
              height={450}
              className="rounded"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {blog.content ? (
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <p className="text-justify">
            {blog.description || 'Tidak ada konten yang tersedia.'}
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogContentText;
