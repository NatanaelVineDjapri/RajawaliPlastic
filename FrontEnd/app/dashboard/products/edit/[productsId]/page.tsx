'use client';

import React from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

const lastEditedProducts = [
  {
    img: '/images/avatarplaceholder.png',
    name: 'PP - White (Tebal)',
    price: '199.999',
    desc: 'Produk plastik indah dan menarik untuk semua keperluan...',
    qty: 1000,
  },
  {
    img: '/images/avatarplaceholder.png',
    name: 'PE - Clear (Tipis)',
    price: '150.000',
    desc: 'Plastik bening untuk pembungkus makanan ringan, kualitas terjamin.',
    qty: 550,
  },
  {
    img: '/images/avatarplaceholder.png',
    name: 'HDPE - Hitam',
    price: '220.500',
    desc: 'Plastik jenis heavy-duty untuk kebutuhan industri dan berat.',
    qty: 250,
  },
];

export default function EditProductPage() {
  const pageTitle = 'Edit Products';

  return (
    <div className="w-100">
      <h1 className="fs-3 fw-semibold text-dark mb-4">{pageTitle}</h1>

      <div className="bg-white rounded-3 shadow p-4 mb-4">
        <div className="d-flex gap-4">
          <div
            className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light"
            style={{
              flex: '0 0 auto',
              width: '300px',
              height: '300px',
              borderColor: '#d1d5db',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            role="button"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
          >
            <Camera size={48} style={{ color: '#9ca3af' }} />
            <span className="small mt-2">Upload Product Image</span>
          </div>

          <form className="d-flex flex-column gap-3 flex-grow-1" style={{ flex: 2 }}>
            <div className="d-flex flex-column">
              <label
                htmlFor="productName"
                className="form-label small fw-medium text-secondary mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="form-control p-3 border rounded-3 bg-light"
                placeholder="Enter product name"
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            <div className="d-flex flex-column flex-grow-1">
              <label
                htmlFor="description"
                className="form-label small fw-medium text-secondary mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                className="form-control p-3 border rounded-3 bg-light"
                placeholder="Enter product description"
                rows={5}
                style={{ fontSize: '0.875rem', minHeight: '180px', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary px-4 py-2 rounded-3 small fw-semibold mt-3 align-self-end disabled"
              style={{ backgroundColor: '#e5e7eb', color: '#9ca3af' }}
            >
              Apply Changes
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-3 shadow table-responsive">
        <h2
          className="fs-5 fw-semibold p-4 mb-0 border-bottom text-dark"
          style={{ borderColor: '#f3f4f6' }}
        >
          Last Edited products
        </h2>
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th
                className="text-uppercase text-secondary small fw-bold bg-light"
                style={{ padding: '1rem 1.5rem', borderBottomWidth: '1px' }}
              >
                Product picture
              </th>
              <th
                className="text-uppercase text-secondary small fw-bold bg-light"
                style={{ padding: '1rem 1.5rem', borderBottomWidth: '1px' }}
              >
                Product Name
              </th>
              <th
                className="text-uppercase text-secondary small fw-bold bg-light"
                style={{ padding: '1rem 1.5rem', borderBottomWidth: '1px' }}
              >
                Price
              </th>
              <th
                className="text-uppercase text-secondary small fw-bold bg-light"
                style={{ padding: '1rem 1.5rem', borderBottomWidth: '1px' }}
              >
                Description
              </th>
              <th
                className="text-uppercase text-secondary small fw-bold bg-light"
                style={{ padding: '1rem 1.5rem', borderBottomWidth: '1px' }}
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {lastEditedProducts.map((product, index) => (
              <tr key={index}>
                <td
                  className="align-middle text-secondary"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="rounded-circle object-fit-cover"
                  />
                </td>
                <td
                  className="align-middle text-dark fw-medium"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {product.name}
                </td>
                <td
                  className="align-middle text-dark"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {product.price}
                </td>
                <td
                  className="align-middle text-dark"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {product.desc}
                </td>
                <td
                  className="align-middle text-dark"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '0.875rem',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {product.qty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
