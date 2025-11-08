'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const initialGalleryItems = [
  { id: 1, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 2, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 3, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 4, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 5, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 6, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 7, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
  { id: 8, type: 'remove', label: 'Remove', img: '/images/logoRS.png' },
];

export default function GalleryPage() {
  const pageTitle = 'Web gallery';
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);

  const handleRemove = (idToRemove: number) => {
    setGalleryItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
    console.log(`Item ID ${idToRemove} dihapus.`);
  };

  return (
    <div className="w-100 position-relative">
      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>

      <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Gallery
        </h2>
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 pb-5">
        {galleryItems.map((item) => (
          <div key={item.id} className="col">
            <div
              className="card h-100 overflow-hidden rounded-3 shadow-sm text-center border"
              style={{ backgroundColor: '#f9fafb', borderColor: '#dee2e6' }}
            >
              <div className="bg-white p-3 d-flex align-items-center justify-content-center" style={{ minHeight: '180px' }}>
                <Image
                  src={item.img}
                  alt={`Gallery item ${item.id}`}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="card-body p-3">
                <button
                  className="btn btn-sm w-100 rounded-3 fw-medium btn-outline-primary"
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: '#e0e0ff',
                    color: '#6c63ff',
                    borderColor: '#c0bfff',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}