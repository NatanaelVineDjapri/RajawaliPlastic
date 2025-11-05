'use client';

import React from 'react';
import styles from '../../gallery/upload/UploadGalleryPage.module.css'; 
import { Camera } from 'lucide-react';

export default function EditHeroPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Hero</h1>
      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Edit Hero Section</h2>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.imageUploader}>
          <Camera size={48} className={styles.cameraIcon} />
          <span>Upload Hero Image</span>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.applyButton} disabled>
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}