'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-5 pb-3" style={{ background: 'linear-gradient(180deg, #1e3a5f, #0b1e30)', borderRadius: '12px 12px 0 0' }}>
      <div className="container">
        <div className="row gy-4 align-items-start">
          {/* === KIRI === */}
          <div className="col-md-4 text-md-start text-center">
            <h2 className="fw-bold display-5 mb-2">Rajawali</h2>
            <h3 className=" text-white mb-3" style={{ fontSize: '3.2rem' }}>Plastik</h3>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center justify-content-md-start justify-content-center gap-2">
                <FaEnvelope /> <span>rajawaliplastik@gmail.com</span>
              </li>
              <li className="mb-2 d-flex align-items-center justify-content-md-start justify-content-center gap-2">
                <FaMapMarkerAlt /> <span>Tangerang, Indonesia</span>
              </li>
              <li className="d-flex align-items-center justify-content-md-start justify-content-center gap-2">
                <FaPhoneAlt /> <span>+62 xxx xxxx xxxx</span>
              </li>
            </ul>
          </div>

          {/* === TENGAH === */}
          <div className="col-md-3 text-md-start text-center">
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-link">Beranda</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-link">Tentang Kami</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-link">Produk</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-link">Testimoni</a></li>
              <li><a href="#" className="text-white text-decoration-none hover-link">Blogs</a></li>
            </ul>
          </div>

          {/* === KANAN === */}
          <div className="col-md-5 text-center text-md-end">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Tangerang&output=embed"
              loading="lazy"
              className="rounded-4 shadow"
              style={{ width: '100%', height: '220px', border: 'none', maxWidth: '400px' }}
            ></iframe>
          </div>
        </div>

        {/* === BAWAH === */}
        <hr className="border-light my-4 opacity-50" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0 small">Copyright © 2025 Rajawali Plastik</p>

          <div className="d-flex gap-4 fs-3">
            <a href="https://www.facebook.com/rajawaliplastik" target="_blank" rel="noopener noreferrer" className="text-white hover-icon">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/natanaellvd" target="_blank" rel="noopener noreferrer" className="text-white hover-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/rajawaliplastik" target="_blank" rel="noopener noreferrer" className="text-white hover-icon">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/@MrBeast" target="_blank" rel="noopener noreferrer" className="text-white hover-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
