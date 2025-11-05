'use client';

import React, { useState, useEffect } from 'react';
import styles from './EditTestimonyPage.module.css'
import { Camera } from 'lucide-react';

export default function EditTestimonyPage({ params }: { params: { testimonyId: string } }) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log("Loading data for testimony:", params.testimonyId);
    setDescription("Ini adalah deskripsi testimoni lama yang diambil dari database untuk diedit.");
    
  }, [params.testimonyId]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Testimony</h1>

      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Edit Testimony #{params.testimonyId}</h2>
      </div>

      <form className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.imageUploader}>
            <Camera size={48} className={styles.cameraIcon} />
            <span>Upload Image</span>
          </div>

          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="--"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.applyButton}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}