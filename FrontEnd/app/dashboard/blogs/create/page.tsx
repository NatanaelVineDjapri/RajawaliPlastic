'use client';

import React from 'react';
import { Camera } from 'lucide-react';

export default function CreateBlogPage() {
  return (
    <div className="container-fluid p-0 pt-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4">Blogs</h1>
      <div className="bg-info-subtle border border-info-subtle rounded-3 p-4">
        <h2 className="fs-5 fw-semibold text-info">Add Blog</h2>
      </div>
      <form className="bg-white rounded-3 shadow-sm p-4 mt-0">
        <div className="d-flex gap-4 align-items-start flex-column flex-lg-row">
          <div 
            className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 text-muted small"
            style={{ minHeight: '300px', flex: 1, cursor: 'pointer', transition: 'background-color 0.2s' }}
          >
            <Camera size={48} className="text-secondary" />
            <span className="mt-1">Upload Image</span>
          </div>
          
          <div className="d-flex flex-column gap-3 flex-grow-1" style={{ flex: 2 }}>
            <div className="d-flex flex-column">
              <label htmlFor="title" className="form-label small fw-medium text-secondary mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-sm bg-light text-dark"
                placeholder="Enter Title..."
                style={{ fontSize: '0.875rem', padding: '0.75rem', borderRadius: '0.5rem' }}
              />
            </div>
            
            <div className="d-flex flex-column">
              <label htmlFor="contents" className="form-label small fw-medium text-secondary mb-1">
                Contents
              </label>
              <textarea
                id="contents"
                className="form-control bg-light text-dark"
                placeholder="Enter Description..."
                rows={5}
                style={{ fontSize: '0.875rem', minHeight: '150px', borderRadius: '0.5rem', resize: 'vertical' }}
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="publishedAt" className="form-label small fw-medium text-secondary mb-1">
                Published At
              </label>
              <input
                type="text"
                id="publishedAt"
                className="form-control bg-light text-dark"
                placeholder="-"
                style={{ width: '150px', fontSize: '0.875rem', padding: '0.75rem', borderRadius: '0.5rem' }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-sm mt-3 align-self-end" 
              style={{ fontWeight: 600, fontSize: '0.875rem' }}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}