'use client';

import Sidenavbar from '../components/admincomponents/Sidenavbar';
import TopNavbar from '../components/admincomponents/TopNavbar';
import CreateButton from '@/app/components/admincomponents/CreateButton';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <TopNavbar />
      <div className="d-flex flex-grow-1 overflow-hidden position-relative">
        <Sidenavbar />

        <main className="flex-grow-1 overflow-y-auto p-4">
          <div className="container-fluid mx-auto" style={{ maxWidth: '1400px' }}>
            {children}
          </div>
        </main>

        <CreateButton />
      </div>
    </div>
  );
}