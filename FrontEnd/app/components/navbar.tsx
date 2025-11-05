'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg rounded-pill px-5 py-0 position-absolute top-0 start-50 translate-middle-x mt-3"
      style={{
        maxWidth: '1400px',
        backgroundColor: 'rgba(255, 255, 255, 0.79)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center"
          style={{
            marginLeft: '-20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffff',
              borderRadius: '50%',
              border: '6px solid #ffffff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/logoRS.png" // Pastikan path ini benar
              alt="Rajawali Plastik Logo"
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-4">
            <li className="nav-item">
              {/* fw-semibold dihapus dari sini */}
              <Link href="/" className="nav-link text-dark">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* fw-semibold dihapus dari sini */}
              <Link href="/about" className="nav-link text-dark">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              {/* fw-semibold dihapus dari sini */}
              <Link href="/products" className="nav-link text-dark">
                Products
              </Link>
            </li>
            <li className="nav-item">
              {/* fw-semibold dihapus dari sini */}
              <Link href="/testimonials" className="nav-link text-dark">
                Testimonies
              </Link>
            </li>
            <li className="nav-item">
              {/* fw-semibold dihapus dari sini */}
              <Link href="/gallery" className="nav-link text-dark">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className="btn btn-primary rounded-pill px-4"
                style={{
                //   '--bs-btn-bg': '#007bff',
                //   '--bs-btn-border-color': '#007bff',
                }}
              >
                Contant Us!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;