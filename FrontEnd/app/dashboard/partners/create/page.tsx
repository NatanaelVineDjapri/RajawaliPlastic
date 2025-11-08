'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatePartnerPage() {
  const router = useRouter();
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new partner...");
    router.push('./');
  };

  return (
    <div className="w-100">
      <h1 className="fs-3 fw-bold text-dark mb-4">Partners</h1>
      <div 
        className="rounded-3 p-4" 
        style={{ backgroundColor: '#C0FBFF' }} 
      >
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Add Partner
        </h2>
      </div>

      <form 
        className="bg-white rounded-3 shadow p-4"
        style={{ minHeight: '400px', position: 'relative' }} 
        onSubmit={handleAddPartner}
      >
        <div className="d-flex gap-5 align-items-start">
          <div 
            className="d-flex flex-column align-items-center justify-content-center p-5 text-muted small rounded-3 border-0 bg-light" 
            style={{ 
              flex: 'auto', 
              maxWidth: '300px',
              minHeight: '350px',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              gap: '0.5rem' 
            }}
            role="button"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          >
            <Camera size={64} style={{ color: '#9ca3af' }} />
          </div>
          
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex flex-column" style={{ maxWidth: '500px' }}>
              <label htmlFor="partnerName" className="form-label small fw-semibold text-secondary mb-1">
                Partner Name
              </label>
              <input
                type="text"
                id="partnerName"
                className="form-control p-3 border rounded-3 bg-light"
                placeholder="Enter product name"
                style={{ fontSize: '0.875rem' }}
              />
            </div>
          </div>
        </div>
    
        <button 
          type="submit"
          className="btn btn-primary px-4 py-2 rounded-3 small fw-semibold"
          style={{ 
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
          }}
        >
          Add
        </button> 
      </form>
    </div>
  );
}