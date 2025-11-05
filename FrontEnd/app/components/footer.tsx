'use client';
import React from 'react';
import '../globals.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* === KIRI: Info Perusahaan === */}
        <div className="footer-left">
          <h2>
            Rajawali <span>Plastik</span>
          </h2>
          <ul>
            <li>
              <FaEnvelope /> rajawaliplastik@gmail.com
            </li>
            <li>
              <FaMapMarkerAlt /> Tangerang, Indonesia
            </li>
            <li>
              <FaPhoneAlt /> +62 xxx xxxx xxxx
            </li>
          </ul>
        </div>

        {/* === TENGAH: Navigasi === */}
        <div className="footer-center">
          <ul>
            <li>Beranda</li>
            <li>Tentang Kami</li>
            <li>Produk</li>
            <li>Testimoni</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* === KANAN: MAP === */}
        <div className="footer-right">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Tangerang&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* === BAGIAN BAWAH: Sosial Media === */}
      <div className="footer-bottom">
        <p>Copyright © 2025 Rajawali Plastik</p>

        <div className="social-icons">
          <a
            href="https://www.facebook.com/rajawaliplastik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/natanaellvd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/rajawaliplastik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.youtube.com/@MrBeast"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
