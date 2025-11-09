'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadGalleryPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new gallery item...");
    router.push('/dashboard/gallery'); 
  };

  return (
    <div className="w-100 pt-4"> 
      <h1 className="fs-3 fw-semibold text-dark mb-4">Web gallery</h1>
      
      <div 
        className="bg-info-subtle border border-info-subtle rounded-3 p-4" 
      >
        <h2 className="fs-5 fw-semibold text-info">Add Gallery</h2>
      </div>
      
      <form 
        className="bg-white rounded-3 shadow-sm p-4 d-flex flex-column align-items-center gap-4 mt-0 w-100"
        onSubmit={handleSubmit}
      >
        <div 
          className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 text-muted small"
          style={{ width: '300px', height: '300px', cursor: 'pointer', transition: 'background-color 0.2s' }}
        >
          <Camera size={48} className="text-secondary mb-2" />
          <span>Upload Image</span>
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
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}