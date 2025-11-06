'use client';

import React from 'react';
import { Camera } from 'lucide-react';

export default function CreateProductPage() {
  const pageTitle = 'Add Product';

  return (
    <div className="w-100">
      <h1 className="fs-3 fw-semibold text-dark mb-4">{pageTitle}</h1>
      <div className="bg-white rounded-3 shadow p-4 mb-4">
        <div className="d-flex gap-4">
          <div 
            className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light"
            style={{ 
              flex: '0 0 auto',
              width: '330px', 
              height: '330px',
              borderColor: '#d1d5db',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            role="button"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          >
            <Camera size={48} style={{ color: '#9ca3af' }} />
            <span className="small mt-2">Upload Product Image</span>
          </div>

          <form className="d-flex flex-column gap-3 flex-grow-1" style={{ flex: 2 }}>
            <div className="d-flex flex-column">
              <label htmlFor="productName" className="form-label small fw-medium text-secondary mb-1">Product Name</label>
              <input 
                type="text" 
                id="productName" 
                className="form-control p-3 border rounded-3 bg-light" 
                placeholder="Enter product name" 
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            <div className="d-flex flex-column flex-grow-1">
              <label htmlFor="description" className="form-label small fw-medium text-secondary mb-1">Description</label>
              <textarea 
                id="description" 
                className="form-control p-3 border rounded-3 bg-light" 
                placeholder="Enter product description" 
                rows={5}
                style={{ fontSize: '0.875rem', minHeight: '150px', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2 rounded-3 small fw-semibold mt-3 align-self-end"
              style={{ transition: 'background-color 0.2s ease', backgroundColor: '#2563eb', borderColor: '#2563eb' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}