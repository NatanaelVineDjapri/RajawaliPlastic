'use client';

import React from 'react';
import { Camera } from 'lucide-react';

export default function CreateTestimonyPage() {
  return (
    <div className="w-100">
      <h1 className="fs-3 fw-bold text-dark mb-4">Testimony</h1>

      <div 
        className="p-4 rounded-top-3 rounded-bottom-0" 
        style={{ 
          backgroundColor: '#C0FBFF',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07)'
        }}
      >
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Add Testimony
        </h2>
      </div>

      <form 
        className="bg-white shadow p-4 rounded-bottom-3 rounded-top-0"
      >
        <div className="d-flex gap-4"> 
          <div 
            className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light"
            style={{ 
              flex: '1', 
              borderColor: '#d1d5db',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              minHeight: '250px',
              maxWidth: '350px',
              color: '#9ca3af',
              fontSize: '0.875rem',
              gap: '0.5rem'
            }}
            role="button"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          >
            <Camera size={48} style={{ color: '#9ca3af' }} />
          </div>

          <div className="d-flex flex-column flex-grow-1 h-100" style={{ flex: 2 }}>
            <div className="d-flex flex-column h-100">
              <label htmlFor="description" className="form-label small fw-medium text-secondary mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="form-control p-3 border rounded-3 bg-light"
                placeholder="-"
                rows={8}
                style={{ 
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  flex: 1,
                  minHeight: '250px' 
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button 
            type="submit" 
            className="btn px-5 py-2 rounded-3 fw-semibold small"
            style={{
              backgroundColor: '#C0FBFF',
              color: '#005F6B',
              border: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a6f5fa'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#C0FBFF'}
          >
            APPLY
          </button>
        </div>
      </form>
    </div>
  );
}
