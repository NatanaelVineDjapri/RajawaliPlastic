'use client';

import React from 'react';
import { Camera } from 'lucide-react';

export default function UploadGalleryPage() {
  return (
    // Mengganti .pageContainer
    <div className="container-fluid py-4">
      
      {/* Mengganti .pageTitle */}
      <h1 className="fs-3 fw-semibold text-dark mb-4">Web gallery</h1>

      {/* Mengganti .banner */}
      <div className="bg-info-subtle border border-info-subtle rounded-3 p-4 mb-4">
        {/* Mengganti .bannerTitle */}
        <h2 className="fs-5 fw-semibold text-info">Add Gallery</h2>
      </div>

      {/* Mengganti .formContainer */}
      {/* Menggunakan d-flex, flex-column, dan align-items-center untuk layout pusat */}
      <form 
        className="bg-white rounded-3 shadow-sm p-4 d-flex flex-column align-items-center gap-4"
        style={{ maxWidth: '600px', margin: '0 auto' }} // Tambahkan max-width untuk fokus
      >
        
        {/* Mengganti .imageUploader */}
        <div 
          className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 text-muted small"
          // Properti ukuran kustom
          style={{ width: '300px', height: '300px', cursor: 'pointer', transition: 'background-color 0.2s' }}
        >
          <Camera size={48} className="text-secondary mb-2" />
          <span>Upload Image</span>
        </div>

        {/* Mengganti .buttonWrapper */}
        <div className="w-100 d-flex justify-content-end mt-3">
          {/* Tombol Apply dengan styling kustom */}
          <button 
            type="submit" 
            className="apply-button-custom"
          >
            Apply
          </button>
        </div>
      </form>

      {/* Gaya Kustom untuk Tombol Apply dan Hover */}
      <style jsx>{`
        .apply-button-custom {
          background-color: #C0FBFF;
          color: #005F6B;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .apply-button-custom:hover {
          background-color: #a6f5fa;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}