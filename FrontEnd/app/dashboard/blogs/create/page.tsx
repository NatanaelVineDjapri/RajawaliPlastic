'use client';

import React from 'react';

import styles from './CreateBlogPage.module.css';
import { Camera } from 'lucide-react';

export default function CreateBlogPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Blogs</h1>
      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Add Blog</h2>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.imageUploader}>
            <Camera size={48} className={styles.cameraIcon} />
            <span>Upload Image</span>
          </div>
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Title
              </label>
              <input
                type="text"
                id="title"
                className={styles.input}
                placeholder="Enter Title..."
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contents" className={styles.label}>
                Contents
              </label>
              <textarea
                id="contents"
                className={styles.textarea}
                placeholder="Enter Description..."
                rows={5}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="publishedAt" className={styles.label}>
                Published At
              </label>
              <input
                type="text" 
                id="publishedAt"
                className={styles.inputSmall}
                placeholder="-"
              />
            </div>
            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}