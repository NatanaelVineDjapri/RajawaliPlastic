'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './EditOrderPage.module.css'; 
import {ChevronRight, ChevronLeft } from 'lucide-react';
import QuantityInput from '@/app/components/admincomponents/QuantityInput'; 

const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
];

export default function EditOrderPage({ params }: { params: { orderId: string } }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Record<number, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    console.log("Loading data for order:", params.orderId);

    setSelectedProducts({
      1: true,
      3: true,
    });    
  }, [params.orderId]); 

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
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

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Order lists</h1>

      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Edit Order #{params.orderId}</h2>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formGrid} ref={dropdownRef}>
          <div className={styles.formLeft}>
            <div className={styles.formGroup}>
              <label htmlFor="productName" className={styles.label}>
                Product Name
              </label>
              <div
                className={styles.productSelector}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{getSelectedProductsText()}</span>
                <ChevronRight size={20} className={styles.productSelectorIcon} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                Price
              </label>
              <input
                type="text"
                id="price"
                className={styles.input}
                placeholder="-"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="quantity" className={styles.label}>
                Configure quantity
              </label>
              <QuantityInput defaultValue={1} />
            </div>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownPanel}>
              <div className={styles.productList}>
                {products.map((product) => (
                  <label key={product.id} className={styles.productItem}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleProductSelect(product.id)}
                    />
                    {product.name}
                  </label>
                ))}
              </div>
              <div className={styles.pagination}>
                <ChevronLeft size={20} className={styles.paginationArrow} />
                <ChevronRight size={20} className={styles.paginationArrow} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.saveButton}>
          Save Changes
        </button>
      </div>
    </div>
  );
}