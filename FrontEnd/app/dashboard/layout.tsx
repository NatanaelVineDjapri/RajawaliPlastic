'use client';

import Sidenavbar from '../components/admincomponents/SideNavBar';
import TopNavbar from '../components/admincomponents/TopNavBar';
import CreateButton from '@/app/components/admincomponents/CreateButton';
import React from 'react';
import { AuthProvider } from '@/app/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="d-flex flex-column vh-100 bg-light">
        <TopNavbar />
        <div className="d-flex flex-column flex-lg-row flex-grow-1 overflow-hidden position-relative">
          <div className="flex-shrink-0">
            <Sidenavbar />
          </div>

          <main className="flex-grow-1 overflow-y-auto p-3 p-lg-4">
            <div className="container-fluid mx-auto" style={{ maxWidth: '1400px' }}>
              {children}
            </div>
          </main>

          <div className="d-lg-block position-static mt-3 mt-lg-0">
            <CreateButton />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}