'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, UserCog, LogOut } from 'lucide-react';

export default function TopNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
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
    <header className="d-flex justify-content-between align-items-center w-100 py-3 px-4 bg-white border-bottom shadow-sm">
      <div className="d-flex align-items-center gap-2 flex-grow-1 justify-content-start">
        <Image
          src="/images/logoRS.png"
          alt="Rajawali Plastik Logo"
          width={40}
          height={40}
        />
        <span className="fs-5 fw-bold text-dark">Rajawali Plastik</span>
      </div>
      <h1 className="flex-grow-1 fs-3 fw-semibold text-dark text-center">
        Administrator Dashboard
      </h1>
      <div
        className="position-relative d-flex justify-content-end flex-grow-1"
        ref={dropdownRef}
      >
        <div
          className="d-flex align-items-center gap-2 p-1 rounded"
          role="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src="/images/avatarplaceholder.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-circle object-fit-cover"
          />
          <div className="d-flex flex-column text-end">
            <span className="fw-semibold small">Moni Roy</span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              Admin
            </span>
          </div>
          <ChevronDown
            size={20}
            className="text-muted"
            style={{
              transition: 'transform 0.2s ease',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
        
        {/* --- INI BAGIAN YANG DIPERBAIKI --- */}
        <nav
          className={`dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-2 mt-3 ${ // Pastikan mt-3 ada di sini
            isDropdownOpen ? 'show' : ''
          }`}
          style={{ 
            width: '200px',
            // Pastikan tidak ada 'marginTop' di sini
          }}
        >
        {/* --- BATAS PERBAIKAN --- */}

          <Link
            href="/dashboard/settings"
            className="dropdown-item d-flex align-items-center gap-2 fw-medium rounded-2"
            onClick={() => setIsDropdownOpen(false)}
          >
            <UserCog size={18} className="text-primary" />
            Manage Account
          </Link>

          <Link
            href="#"
            className="dropdown-item d-flex align-items-center gap-2 fw-medium rounded-2 text-danger"
            onClick={() => setIsDropdownOpen(false)}
          >
            <LogOut size={18} className="text-danger" />
            Log out
          </Link>
        </nav>
      </div>
    </header>
  );
}