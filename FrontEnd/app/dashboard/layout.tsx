'use client';

import Sidenavbar from '@/app/components/admincomponents/sidenavbar';
import CreateButton from '@/app/components/admincomponents/CreateButton';
import React from 'react';
import styles from './DashboardLayout.module.css';
import TopNavbar from '../components/admincomponents/topnavbar';

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