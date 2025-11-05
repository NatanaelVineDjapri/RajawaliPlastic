'use client';

import React from 'react';
import styles from './UploadGalleryPage.module.css'; // Kita akan buat file CSS ini
import { Camera } from 'lucide-react'; // Ikon untuk upload box

export default function UploadGalleryPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Judul Halaman */}
      <h1 className={styles.pageTitle}>Web gallery</h1>

      {/* Banner Biru */}
      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Add Gallery</h2>
      </div>

      {/* Kontainer Form Utama */}
      <form className={styles.formContainer}>
        
        {/* Upload Box di Tengah */}
        <div className={styles.imageUploader}>
          <Camera size={48} className={styles.cameraIcon} />
          <span>Upload Image</span>
        </div>

        {/* Tombol Apply di Kanan Bawah */}
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.applyButton}>
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}