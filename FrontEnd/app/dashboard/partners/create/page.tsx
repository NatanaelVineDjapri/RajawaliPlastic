'use client';

import React from 'react';
import styles from './CreatePartnerPage.module.css';
import { Camera } from 'lucide-react';

export default function CreatePartnerPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Partners</h1>
      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Add Partner</h2>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.imageUploader}>
            <Camera size={48} className={styles.cameraIcon} />
            <span>Upload Logo</span>
          </div>
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="partnerName" className={styles.label}>
                Partner Name
              </label>
              <input
                type="text"
                id="partnerName"
                className={styles.input}
                placeholder="Enter partner name"
              />
            </div>

            <button type="submit" className={styles.addButton} disabled>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}