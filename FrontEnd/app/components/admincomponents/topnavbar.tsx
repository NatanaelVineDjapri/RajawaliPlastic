'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, UserCog, LogOut } from 'lucide-react';
import styles from './TopNavbar.module.css';

export default function TopNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

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
      <div className={styles.userProfileWrapper} ref={dropdownRef}>
        <div
          className={styles.userProfile}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
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
          <ChevronDown
            className={`${styles.dropdownIcon} ${
              isDropdownOpen ? styles.dropdownIconOpen : ''
            }`}
            size={20}
          />
        </div>

        <nav
          className={`${styles.dropdownMenu} ${
            isDropdownOpen ? styles.dropdownMenuOpen : ''
          }`}
        >
          <Link
            href="/dashboard/settings"
            className={styles.dropdownLink}
            onClick={() => setIsDropdownOpen(false)}
          >
            <UserCog size={18} className={styles.dropdownItemIconManage} />
            Manage Account
          </Link>
          <Link
            href="#"
            className={`${styles.dropdownLink} ${styles.dropdownLinkLogout}`}
            onClick={() => setIsDropdownOpen(false)}
          >
            <LogOut size={18} className={styles.dropdownItemIconLogout} />
            Log out
          </Link>
        </nav>
      </div>
    </header>
  );
}