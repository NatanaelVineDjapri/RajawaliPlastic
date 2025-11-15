'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProfile } from '@/services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone_number?: string;
  role: string;
}

export default function TopNavbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error('Gagal ambil profile:', err);
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="d-flex justify-content-between align-items-center w-100 py-3 px-3 px-md-4 bg-white border-bottom shadow-sm flex-wrap">
      <div className="d-flex align-items-center gap-2 flex-grow-0 me-2">
        <Image
          src="/images/logoRS.png"
          alt="Rajawali Plastik Logo"
          width={40}
          height={40}
        />
        <span className="fs-5 fw-bold text-dark">Rajawali Plastik</span>
      </div>

      <h1 className="flex-grow-1 fs-6 fs-md-5 fs-lg-4 fw-semibold text-dark text-center m-0">
        Administrator Dashboard
      </h1>

      <div className="d-flex align-items-center gap-2 flex-grow-0 ms-2">
        <Image
          src="/images/avatarplaceholder.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-circle object-fit-cover"
        />
        <div className="d-flex flex-column text-start">
          <span className="fw-semibold small">{user?.name || 'Guest'}</span>
          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
