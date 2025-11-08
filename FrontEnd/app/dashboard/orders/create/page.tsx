'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import QuantityInput from '@/app/components/admincomponents/QuantityInput'; 
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
];

export default function CreateOrderPage() {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Record<number, boolean>>({});
  
  const productSelectorRef = useRef<HTMLDivElement>(null); 
  const formGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formGridRef.current && !formGridRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  const handleProductSelect = (productId: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getSelectedProductsText = () => {
    const selected = Object.values(selectedProducts).filter(Boolean);
    if (selected.length === 0) return '-';
    if (selected.length === 1) {
      const id = Object.keys(selectedProducts).find(key => selectedProducts[Number(key)]);
      return products.find(p => p.id === Number(id))?.name || '1 product selected';
    }
    return `${selected.length} products selected`;
  };
  const handleCreateOrder = () => {
      router.push('/dashboard/orders'); 
  };


  return (
    <div className="w-100">
      <h1 className="fs-3 fw-bold text-dark mb-4">Order lists</h1> 

      <div className="rounded-3 p-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>
          Create new order
        </h2>
      </div>

      <div className="bg-white rounded-3 shadow p-4">
        <div className="d-flex gap-4 position-relative" ref={formGridRef}>
          <div className="d-flex flex-column gap-3" style={{ width: '350px', flexShrink: 0 }}>
            <div className="d-flex flex-column position-relative">
              <label htmlFor="productName" className="form-label small fw-semibold text-secondary mb-1">
                Product Name
              </label>
              <div
                ref={productSelectorRef}
                className="d-flex justify-content-between align-items-center p-3 border rounded-3 bg-light text-dark fw-medium"
                role="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ cursor: 'pointer', borderColor: '#d1d5db' }}
              >
                <span>{getSelectedProductsText()}</span>
                <ChevronRight size={20} className="text-primary" />
              </div>
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="price" className="form-label small fw-semibold text-secondary mb-1">
                Price
              </label>
              <input
                type="text"
                id="price"
                className="form-control p-3 border rounded-3 bg-light"
                placeholder="-"
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="quantity" className="form-label small fw-semibold text-secondary mb-1">
                Configure quantity
              </label>
              <QuantityInput defaultValue={1} />
            </div>
          </div>

          {isDropdownOpen && (
            <div 
              className="position-absolute bg-white rounded-3 shadow-lg border p-3" 
              style={{ 
                top: '0', 
                left: '370px',
                width: '350px',
                zIndex: 20,
                marginTop: '0.75rem', 
              }}
            >
              <div className="row row-cols-2 g-3 mb-3">
                {products.map((product) => (
                  <div key={product.id} className="col">
                    <div className="form-check small text-dark">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`product-${product.id}`}
                        checked={!!selectedProducts[product.id]}
                        onChange={() => handleProductSelect(product.id)}
                      />
                      <label 
                        className="form-check-label" 
                        htmlFor={`product-${product.id}`}
                      >
                        {product.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <ChevronLeft size={20} className="text-muted" role="button" />
                <ChevronRight size={20} className="text-muted" role="button" />
              </div>
            </div>
          )}
          <div className="flex-grow-1"></div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button 
          type="button"
          className="btn btn-primary px-4 py-2 rounded-3 small fw-semibold"
          onClick={handleCreateOrder}
        >
          Create
        </button>
      </div>
    </div>
  );
}