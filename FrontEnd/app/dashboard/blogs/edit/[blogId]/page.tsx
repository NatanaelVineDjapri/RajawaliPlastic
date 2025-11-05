'use client';

import React, { useState, useEffect } from 'react';
import styles from './EditBlogPage.module.css'; 
import { Camera } from 'lucide-react';

export default function EditBlogPage({ params }: { params: { blogId: string } }) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  useEffect(() => {
    console.log("Loading data for blog:", params.blogId);
    setTitle("Judul Blog Lama dari Database");
    setContents("Ini adalah isi konten blog yang sudah ada sebelumnya...");
    setPublishedAt("01/11/25");
  }, [params.blogId]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Blogs</h1>

      <div className={styles.banner}>
        <h2 className={styles.bannerTitle}>Edit Blog #{params.blogId}</h2>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={contents}
                onChange={(e) => setContents(e.target.value)}
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
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </div>
            
            <button type="submit" className={styles.applyButtonActive}>
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
