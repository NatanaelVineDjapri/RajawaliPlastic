'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PersonCircle, List, X } from 'react-bootstrap-icons';

const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const navLinks = [
    { href: '/#home', label: 'Beranda' },
    { href: '/#about', label: 'Tentang Kami' },
    { href: '/#products', label: 'Produk' },
    { href: '/#testimonies', label: 'Testimoni' },
    { href: '/#blogs', label: 'Blogs' },
    { href: '/#gallery', label: 'Gallery' },
  ];

  return (
    <>
      <div
        className="position-fixed top-0 end-0 p-3 d-flex d-lg-none"
        style={{ zIndex: 9999 }}
      >
        <button
          onClick={toggleMenu}
          className="btn btn-light rounded-circle shadow"
          style={{ width: '50px', height: '50px' }}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {open && (
        <div
          className="position-fixed top-0 start-0 vh-100 vw-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9998 }}
          onClick={toggleMenu}
        >
          <div
            className="bg-white rounded-4 p-4 shadow text-center"
            style={{ width: '80%', maxWidth: '300px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="list-unstyled mb-4">
              {navLinks.map((item) => (
                <li key={item.href} className="mb-3">
                  <Link
                    href={item.href}
                    className="fw-semibold text-dark text-decoration-none"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/chat"
              className="btn btn-primary w-100 rounded-pill mb-3"
              onClick={() => setOpen(false)}
            >
              Hubungi Kami!
            </Link>

            <Link
              href="/profile"
              className="btn btn-outline-dark w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
              onClick={() => setOpen(false)}
            >
              <PersonCircle />
              Profil
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
