'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const partners = [
  { id: 1, name: 'OT Group', logoSrc: '/images/logoRS.png' },
  { id: 2, name: 'Wings', logoSrc: '/images/logoRS.png' },
  { id: 3, name: 'Prima Pack', logoSrc: '/images/logoRS.png' },
  { id: 4, name: 'Lux', logoSrc: '/images/logoRS.png' },
  { id: 5, name: 'Lock n Lock', logoSrc: '/images/logoRS.png' },
  { id: 6, name: 'Lion Star', logoSrc: '/images/logoRS.png' },
];

export default function PartnersPage() {
  const pageTitle = 'Partners';

  const handleDelete = (id: number, name: string) => {
    console.log(`Menghapus partner ID ${id}: ${name}`);
  };

  return (
    <div className="w-100 position-relative">
      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>

      <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Partners
        </h2>
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 pb-5">
        {partners.map((partner) => (
          <div key={partner.id} className="col">
            <div
              className="card h-100 overflow-hidden position-relative rounded-3 shadow-sm text-center border-0"
              style={{ backgroundColor: '#e0e9ff' }}
            >
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                onClick={() => handleDelete(partner.id, partner.name)}
                style={{ width: '28px', height: '28px', padding: '0', zIndex: 10 }}
              >
                <X size={14} />
              </button>

              <div className="bg-white p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="card-body py-2 px-1">
                <p className="card-text fw-medium small text-dark mb-0">{partner.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
