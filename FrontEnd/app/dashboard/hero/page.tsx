'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const initialHeroItems = [
  { id: 1, label: 'Slider 1', img: '/images/logoRS.png' },
  { id: 2, label: 'Slider 2', img: '/images/logoRS.png' },
  { id: 3, label: 'Slider 3', img: '/images/logoRS.png' },
  { id: 4, label: 'Slider 4', img: '/images/logoRS.png' },
  { id: 5, label: 'Slider 5', img: '/images/logoRS.png' },
  { id: 6, label: 'Slider 6', img: '/images/logoRS.png' },
  { id: 7, label: 'Slider 7', img: '/images/logoRS.png' },
  { id: 8, label: 'Slider 8', img: '/images/logoRS.png' },
];

export default function HeroPage() {
  const pageTitle = 'Hero';
  const [heroItems, setHeroItems] = useState(initialHeroItems);

  const handleRemove = (idToRemove: number) => {
    setHeroItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="w-100 px-2 px-md-4">
      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>

      <div className="rounded-3 p-3 p-md-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>Gallery</h2>
      </div>

      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4 pb-5">
        {heroItems.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 overflow-hidden rounded-3 shadow-sm border" style={{ backgroundColor: '#f9fafb', borderColor: '#dee2e6' }}>
              <div className="bg-white p-2 p-md-3 d-flex align-items-center justify-content-center border-bottom" style={{ minHeight: '140px', height: '100%' }}>
                <Image
                  src={item.img}
                  alt={item.label}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="card-body p-2 p-md-3 d-flex flex-column gap-2">
                <p className="card-text fw-semibold text-dark mb-1 text-center text-md-start">{item.label}</p>
                <button
                  className="btn btn-sm px-3 rounded-3 fw-medium w-100"
                  onClick={() => handleRemove(item.id)}
                  style={{ backgroundColor: '#e0e0ff', color: '#6c63ff', borderColor: '#c0bfff' }}
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
