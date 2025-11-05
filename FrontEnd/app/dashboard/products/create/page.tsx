'use client';

import React from 'react';
import styles from './CreateProductPage.module.css';
import { Camera } from 'lucide-react';
import QuantityInput from '@/app/components/admincomponents/QuantityInput';

export default function CreateProductPage() {
  const pageTitle = 'Add Product';

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

            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}