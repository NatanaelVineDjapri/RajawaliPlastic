"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const initialPartners = [
  { id: 1, name: 'OT Group', logoSrc: '/images/logoRS.png' },
  { id: 2, name: 'Wings', logoSrc: '/images/logoRS.png' },
  { id: 3, name: 'Prima Pack', logoSrc: '/images/logoRS.png' },
  { id: 4, name: 'Lux', logoSrc: '/images/logoRS.png' },
  { id: 5, name: 'Lock n Lock', logoSrc: '/images/logoRS.png' },
  { id: 6, name: 'Lion Star', logoSrc: '/images/logoRS.png' },
];

export default function PartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const pageTitle = 'Partners';

  const handleDelete = (id: number) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id));
  };

  return (
    <div className="w-100 position-relative">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

      {isLoading && (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!isLoading && partners.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">
            No partners found. Click the '+' button to add one.
          </p>
        </div>
      )}

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 pb-5">
        {partners.map((partner) => (
          <div key={partner.id} className="col">
            <div
              className="card h-100 overflow-hidden position-relative rounded-3 shadow-sm text-center border-0"
              style={{ backgroundColor: '#e0e9ff' }}
            >
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                onClick={() => handleDelete(partner.id)}
                style={{ width: '28px', height: '28px', padding: '0', zIndex: 10 }}
              >
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

              <div
                className="bg-white p-4 d-flex align-items-center justify-content-center"
                style={{ minHeight: '150px' }}
              >
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>

                  <div className="mt-auto d-flex gap-2">
                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="btn btn-sm btn-outline-danger px-3 rounded-3 d-flex align-items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}