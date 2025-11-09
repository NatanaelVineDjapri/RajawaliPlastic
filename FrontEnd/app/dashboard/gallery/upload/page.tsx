'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadGalleryPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/gallery'); 
  };

  return (
    <div className="w-100 pt-4 px-2 px-md-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4 text-center text-md-start">Web gallery</h1>
      
      <div className="bg-info-subtle border border-info-subtle rounded-3 p-3 p-md-4 mb-4">
        <h2 className="fs-5 fw-semibold text-info mb-0">Add Gallery</h2>
      </div>
      
      <form
        className="bg-white rounded-3 shadow-sm p-3 p-md-4 d-flex flex-column align-items-center gap-4 mx-auto"
        style={{ maxWidth: '500px', width: '100%' }}
        onSubmit={handleSubmit}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 text-muted small"
          style={{
            width: '100%',
            aspectRatio: '1/1',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            maxWidth: '400px',
          }}
        >
          <Camera size={48} className="text-secondary mb-2" />
          <span className="text-center">Upload Image</span>
        </div>
        
        <div className="w-100 d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="btn px-4 py-2 rounded-3 fw-semibold small"
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}