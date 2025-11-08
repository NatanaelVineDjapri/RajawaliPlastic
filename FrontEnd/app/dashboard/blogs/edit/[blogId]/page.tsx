'use client';

import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface EditBlogPageProps {
  params: { blogId: string };
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  useEffect(() => {
    console.log('Loading data for blog:', params.blogId);
    setTitle('Judul Blog Lama dari Database');
    setContents('Ini adalah isi konten blog yang sudah ada sebelumnya...');
    setPublishedAt('01/11/25');
  }, [params.blogId]);

  const isFormValid = title.trim().length > 0 && contents.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Submitting updated blog data:', { title, contents, publishedAt });
      alert('Blog Updated!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="container-fluid p-0 pt-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4">Blogs</h1>

      <div className="bg-info-subtle border border-info-subtle p-4 rounded-top-3 rounded-bottom-0">
        <h2 className="fs-5 fw-semibold text-info">Edit Blog #{params.blogId}</h2>
      </div>

      <form
        className="bg-white rounded-3 shadow-sm p-4 mt-0 rounded-bottom-3 rounded-top-0"
        onSubmit={handleSubmit}
      >
        <div className="d-flex gap-4 align-items-start flex-column flex-lg-row">
          <div
            className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 text-muted small"
            style={{
              minHeight: '300px',
              flex: 1,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <Camera size={48} className="text-secondary" />
            <span className="mt-1">Upload Image</span>
          </div>

          <div className="d-flex flex-column gap-3 flex-grow-1" style={{ flex: 2 }}>
            <div className="d-flex flex-column">
              <label
                htmlFor="title"
                className="form-label small fw-medium text-secondary mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-sm bg-light text-dark"
                placeholder="Enter Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  fontSize: '0.875rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                }}
              />
            </div>

            <div className="d-flex flex-column">
              <label
                htmlFor="contents"
                className="form-label small fw-medium text-secondary mb-1"
              >
                Contents
              </label>
              <textarea
                id="contents"
                className="form-control bg-light text-dark"
                placeholder="Enter Description..."
                rows={5}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                style={{
                  fontSize: '0.875rem',
                  minHeight: '150px',
                  borderRadius: '0.5rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <div className="d-flex flex-column">
              <label
                htmlFor="publishedAt"
                className="form-label small fw-medium text-secondary mb-1"
              >
                Published At
              </label>
              <input
                type="text"
                id="publishedAt"
                className="form-control bg-light text-dark"
                placeholder="-"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                style={{
                  width: '150px',
                  fontSize: '0.875rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-sm mt-3 align-self-end ${
                isFormValid ? 'apply-button-active' : 'submit-button-disabled'
              }`}
              disabled={!isFormValid}
              style={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              Apply
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .submit-button-disabled {
          background-color: #f3f4f6;
          color: #9ca3af;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: not-allowed;
        }

        .apply-button-active {
          background-color: #c0fbff;
          color: #005f6b;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .apply-button-active:hover {
          background-color: #a6f5fa;
        }
      `}</style>
    </div>
  );
}