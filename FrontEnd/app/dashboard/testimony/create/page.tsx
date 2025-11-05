'use client';

import React from 'react';
import styles from './CreateTestimonyPage.module.css'; // Kita akan buat file CSS ini
import { Camera } from 'lucide-react'; // Ikon untuk upload box

export default function CreateTestimonyPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Judul Halaman */}
      <h1 className={styles.pageTitle}>Testimony</h1>

      {/* Banner Biru */}
      <div className={styles.banner}>
        {/* Saya perbaiki ya, di desain tulisannya 'galery', harusnya 'Testimony' */}
        <h2 className={styles.bannerTitle}>Add Testimony</h2>
      </div>

      {/* Kontainer Form Utama */}
      <form className={styles.formContainer}>
        <div className={styles.formSection}>
          {/* Bagian Kiri: Upload Gambar */}
          <div className={styles.imageUploader}>
            <Camera size={48} className={styles.cameraIcon} />
            <span>Upload Image</span>
            {/* <input type="file" style={{ display: 'none' }} /> */}
          </div>

          {/* Bagian Kanan: Input Fields */}
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="--"
                rows={8} // Kita buat lebih tinggi
              />
            </div>
          </div>
        </div>

        {/* Tombol Apply di Paling Bawah */}
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.applyButton}>
            APPLY
          </button>
        </div>
      </form>
    </div>
  );
}