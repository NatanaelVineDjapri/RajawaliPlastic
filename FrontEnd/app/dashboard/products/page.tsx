'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const productItems = [
  { id: 1, name: 'PP - Cream', price: '150.000', img: '/images/logoRS.png' },
  { id: 2, name: 'HDPE - White', price: '200.000', img: '/images/logoRS.png' },
  { id: 3, name: 'PP - White', price: '210.000', img: '/images/logoRS.png' },
  { id: 4, name: 'PP - Neon Blue', price: '200.000', img: '/images/logoRS.png' },
  { id: 5, name: 'LDPE - Teal', price: '250.000', img: '/images/logoRS.png' },
  { id: 6, name: 'PP - Red', price: '150.000', img: '/images/logoRS.png' },
];

export default function ProductsPage() {
  const pageTitle = 'Products';

  return (
    <div className="w-100 position-relative">
      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>
      <div className="row row-cols-2 row-cols-md-3 g-4 pb-5">
        {productItems.map((item) => (
          <div key={item.id} className="col">
            <div
              className="card h-100 overflow-hidden rounded-3 shadow-sm border-0"
              style={{ backgroundColor: '#ffffff', borderColor: '#dee2e6' }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="card-body p-3 text-start d-flex flex-column">
                <h5 className="card-title fw-semibold small text-dark mb-1">{item.name}</h5>
                <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                  Rp. {item.price}
                </p>
                <Link
                  href={`/dashboard/products/edit/${item.id}`}
                  className="btn btn-sm px-3 rounded-3 fw-medium mt-auto"
                  style={{
                    backgroundColor: '#e0e9ff',
                    color: '#6c63ff',
                    borderColor: '#c0bfff',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}
                >
                  Edit Product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}