'use client';

import React from 'react';
import Image from 'next/image';
import styles from './EditProductPage.module.css';
import { Camera } from 'lucide-react';
import QuantityInput from '@/app/components/admincomponents/QuantityInput';

const lastEditedProducts = [
  {
    img: '/images/avatarplaceholder.png',
    name: 'PP - White',
    price: '199.999',
    desc: 'Produk plastik indah dan menarik untuk semua...',
    qty: 1000,
  },
  // masukan data lainyya
];

export default function EditProductPage() {
  const pageTitle = 'Edit Products';

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      <div className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.imageUploader}>
            <Camera size={48} className={styles.cameraIcon} />
          </div>
          <form className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="productName" className={styles.label}>Product Name</label>
              <input type="text" id="productName" className={styles.input} placeholder="Enter product name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>Price</label>
              <input type="text" id="price" className={styles.input} placeholder="Enter product price" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea id="description" className={styles.textarea} placeholder="Enter product description" rows={3} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="quantity" className={styles.label}>
                Configure quantity
              </label>
              <QuantityInput defaultValue={1} />
            </div>
            
            <button type="submit" className={styles.applyButton} disabled>
              Apply Changes
            </button>
          </form>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Last Edited products</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Product picture</th>
              <th className={styles.th}>Product Name</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lastEditedProducts.map((product, index) => (
              <tr key={index}>
                <td className={styles.td}>
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={32}
                    height={32}
                    className={styles.productImage}
                  />
                </td>
                <td className={`${styles.td} ${styles.productNameCell}`}>
                  {product.name}
                </td>
                <td className={styles.td}>{product.price}</td>
                <td className={styles.td}>{product.desc}</td>
                <td className={styles.td}>{product.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}