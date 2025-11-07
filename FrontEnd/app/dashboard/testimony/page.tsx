'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const testimonyItems = [
  { id: 1, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 2, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 3, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 4, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 5, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 6, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 7, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
  { id: 8, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..', img: '/images/logoRS.png' },
];

export default function TestimonyPage() {
  const pageTitle = 'Testimony';

  return (
    <div className="w-100 position-relative">

      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>
      <div 
        className="rounded-3 p-4 mb-4" 
        style={{ backgroundColor: '#C0FBFF' }} 
      >
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Gallery
        </h2>
      </div>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 pb-5">
        {testimonyItems.map((item) => (
          <div key={item.id} className="col">
            <div 
              className="card h-100 overflow-hidden rounded-3 shadow-sm border"
              style={{ backgroundColor: '#f9fafb', borderColor: '#dee2e6' }} 
            >
              <div className="bg-white p-3 d-flex align-items-center justify-content-center border-bottom" style={{ minHeight: '150px' }}>
                <Image
                  src={item.img}
                  alt={`Testimony item ${item.id}`}
                  width={120} 
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="card-body p-3 text-start">
                <p className="fw-medium small text-dark mb-1">Description</p>
                <p className="card-text small text-muted mb-3">
                  {item.desc}
                </p>
                <Link
                  href={`/dashboard/testimony/edit/${item.id}`}
                  className="btn btn-sm px-3 rounded-3 fw-medium"
                  style={{ 
                    backgroundColor: '#e0e0ff',
                    color: '#6c63ff',
                    borderColor: '#c0bfff',
                    textDecoration: 'none'
                  }}
                >
                  Edit Gallery
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}