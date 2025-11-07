'use client';

import Sidenavbar from '../components/admincomponents/SideNavbar';
import TopNavbar from '../components/admincomponents/TopNavbar';
import CreateButton from '@/app/components/admincomponents/CreateButton';
import React from 'react';
import { AuthProvider } from '@/app/contexts/AuthContext'; // 1. IMPORT

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. BUNGKUS SEMUANYA DENGAN AUTHPROVIDER
    <AuthProvider>
      <div className="d-flex flex-column vh-100 bg-light">
        <TopNavbar /> {/* <-- Sekarang TopNavbar ada DI DALAM AuthProvider */}
        <div className="d-flex flex-grow-1 overflow-hidden position-relative">
          <Sidenavbar />

          <main className="flex-grow-1 overflow-y-auto p-4">
            <div className="container-fluid mx-auto" style={{ maxWidth: '1400px' }}>
              {children} {/* <-- children juga di DALAM AuthProvider */}
            </div>
          </main>

          <CreateButton />
        </div>
      </div>
    </AuthProvider>
  );
}