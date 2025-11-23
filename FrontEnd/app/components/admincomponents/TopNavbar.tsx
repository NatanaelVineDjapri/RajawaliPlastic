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
    <header className="d-flex justify-content-between align-items-center w-100 py-3 px-3 px-md-4 bg-primary border-bottom shadow-sm flex-wrap">
      
      {/* LOGO + BRAND */}
      <div className="d-flex align-items-center gap-2 flex-grow-0 me-2">
        <Image
          className="shadow bg-white p-2 rounded-circle"
          src="/images/logoRS.png"
          alt="Rajawali Plastik Logo"
          width={45}
          height={45}
        />

        {/* ❌ Brand akan hilang di tablet & HP */}
        <span className="fs-5 fw-bold text-light d-none d-lg-inline">
          Rajawali Plastik
        </span>
      </div>

      {/* TITLE */}
      <h1 className="flex-grow-1 fs-6 fs-md-5 fs-lg-4 fw-semibold text-light text-center m-0">
        Administrator Dashboard
      </h1>

      {/* PROFILE RIGHT */}
      <div className="d-flex align-items-center gap-2 flex-grow-0 ms-2 bg-light p-2 p-md-3 rounded">
        <Image
          src="/images/pfp.jpg"
          alt="User Avatar"
          width={45}
          height={45}
          className="rounded-circle object-fit-cover"
        />

        {/* ❌ Nama + Admin disembunyikan di tablet & HP */}
        <div className="d-none d-lg-flex flex-column text-start">
          <span className="fw-semibold small">{user?.name || 'Guest'}</span>
          <span className="text-black" style={{ fontSize: '0.75rem' }}>
            Admin
          </span>
        </div>
      </div>

    </header>
  );
}
