'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditHeroPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Applying hero section changes...");
    router.push('/dashboard/hero'); 
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4">Hero</h1>
      <div className="bg-info-subtle border border-info-subtle rounded-3 p-3 mb-0">
        <h2 className="fs-5 fw-semibold text-info mb-0">Edit Hero Section</h2>
      </div>

      <form
        className="bg-white rounded-3 shadow-sm p-4 d-flex flex-column align-items-center gap-4"
        onSubmit={handleSubmit}
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-5 text-muted small"
          style={{ width: '200px', height: '200px', cursor: 'pointer' }}
        >
          <Camera size={48} className="text-secondary" />
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <button
            type="submit"
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#9ca3af',
              fontWeight: 600,
              border: 'none',
              padding: '0.6rem 1.5rem',
            }}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
