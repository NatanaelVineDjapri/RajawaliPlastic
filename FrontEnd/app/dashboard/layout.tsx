// Lokasi file: app/dashboard/layout.tsx
'use client';

import Sidenavbar from '@/app/components/admincomponents/sidenavbar';
import TopNavbar from '../components/admincomponents/topnavbar';
import CreateButton from '@/app/components/admincomponents/CreateButton'; // <-- 1. Import di sini
import React from 'react';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageWrapper}>
      <TopNavbar /> 
      <div className={styles.contentWrapper}>
        <Sidenavbar />
        <main className={styles.mainContent}>
          {children} 
        </main>
      </div>
      <CreateButton /> 
    </div>
  );
}