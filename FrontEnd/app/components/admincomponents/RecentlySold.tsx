'use client';

import React from 'react';

interface Product {
  name: string;
  price: string;
  description: string;
  quantity: number;
}

const mockProducts: Product[] = [
  { name: 'PP - White', price: '199.999', description: 'Produk plastik indah dan menarik untuk semua...', quantity: 1000 },
  { name: 'PP - Teal', price: '199.999', description: 'Produk plastik indah dan menarik untuk semua...', quantity: 1000 },
  { name: 'PE - Blue', price: '199.999', description: 'Produk plastik indah dan menarik untuk semua...', quantity: 1000 },
];

const productImageSm: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '0.5rem',
  objectFit: 'cover',
};

const RecentlySoldTable: React.FC = () => {
  return (
    <div className="p-3 p-md-4 bg-white rounded-3 shadow-sm">
      <h2 className="fs-5 fw-bold mb-3 text-center text-md-start">Produk Baru Terjual</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="py-3 text-nowrap">Product Picture</th>
              <th scope="col" className="py-3 text-nowrap">Product Name</th>
              <th scope="col" className="py-3 text-nowrap">Price</th>
              <th scope="col" className="py-3 d-none d-sm-table-cell">Description</th>
              <th scope="col" className="py-3 text-nowrap">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product, index) => (
              <tr key={index}>
                <td>
                  <div
                    className="bg-light rounded d-flex align-items-center justify-content-center mx-auto"
                    style={productImageSm}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.576-.094L.548.995l-7.397 3.791V3a1 1 0 0 1 1-1zM1.002 14v-2.002h12v2.002a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1z"/>
                    </svg>
                  </div>
                </td>
                <td className="text-nowrap">{product.name}</td>
                <td className="text-nowrap">{product.price}</td>
                <td className="d-none d-sm-table-cell text-truncate" style={{ maxWidth: '150px' }}>
                  {product.description}
                </td>
                <td className="text-nowrap">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        @media (max-width: 576px) {
          table {
            font-size: 0.875rem;
          }
          th, td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RecentlySoldTable;