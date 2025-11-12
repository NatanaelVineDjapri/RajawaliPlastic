'use client';
import React from 'react';

interface RecentlySoldTableProps {
  orders: any[];
}

export default function RecentlySoldTable({ orders }: RecentlySoldTableProps) {
  return (
    <div className="p-3 p-md-4 bg-white rounded-3 shadow-sm">
      <h2 className="fs-5 fw-bold mb-3 text-center text-md-start">Produk Baru Terjual</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="py-3 text-nowrap">Product Name</th>
              <th scope="col" className="py-3 text-nowrap">Total Price</th>
              <th scope="col" className="py-3 text-nowrap">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              order.products.map((product: any, idx: number) => (
                <tr key={`${index}-${idx}`}>
                  <td>{product.product_name}</td>
                  <td>RP {product.total_price.toLocaleString()}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
