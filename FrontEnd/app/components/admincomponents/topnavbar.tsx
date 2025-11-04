'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import styles from './TopNavbar.module.css';

export default function TopNavbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/logoRS.png"
          alt="Rajawali Plastik Logo"
          width={40}
          height={40}
          className={styles.logoImage}
        />
        <span className={styles.logoText}>Rajawali Plastik</span>
      </div>

      <h1 className={styles.title}>Administrator Dashboard</h1>

      <div className={styles.userProfile}>
        <Image
          src="/images/avatarplaceholder.png"
          alt="User Avatar"
          width={40}
          height={40}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>Moni Roy</span>
          <span className={styles.userRole}>Admin</span>
        </div>
        <ChevronDown className={styles.dropdownIcon} size={20} />
      </div>
    </header>
  );
}
