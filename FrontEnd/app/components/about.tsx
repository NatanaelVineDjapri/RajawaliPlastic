'use client';
import React from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <Container className="about-container">
        <h2 className="about-title">
          Tentang Kami
        </h2>

        <div className="about-glass-card">
          <div className="about-image-wrapper">
            <Image
              src="/images/About_Image.jpg"
              alt="Rajawali Plastik"
              width={600}
              height={400}
              className="about-image"
            />
          </div>

          <div className="about-content">
            <h5 className="fw-bold mb-3 text-white">PROFIL PERUSAHAAN</h5>
            <p>
              <strong>Rajawali Plastik</strong> adalah perusahaan yang bergerak di bidang
              distribusi <strong>bahan baku plastik</strong> untuk kebutuhan industri.
              Dengan jaringan yang luas, kami berkomitmen menghadirkan produk berkualitas tinggi
              dan layanan yang cepat serta profesional.
            </p>
            <p>
              Kami menjalin kerja sama jangka panjang dengan prinsip saling menguntungkan
              antara supplier dan klien, serta terus berinovasi mendukung kemajuan industri plastik.
            </p>

            <div className="about-vision-mission">
              <div>
                <h5 className="fw-bold text-white">VISI</h5>
                <p>Menjadi mitra terpercaya dalam penyediaan bahan baku plastik berkualitas.</p>
              </div>

              <div>
                <h5 className="fw-bold text-white">MISI</h5>
                <ul className="list-unstyled">
                  <li><i className="bi bi-check-circle-fill me-2"></i>- Menyediakan bahan baku plastik berkualitas dengan harga kompetitif.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>- Pelayanan cepat dan berorientasi kebutuhan klien.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>- Menjaga profesionalisme dan integritas bisnis.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>- Berkontribusi bagi pertumbuhan industri plastik nasional.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="about-bg-orb"></div>
      </Container>
    </section>
  );
};

export default About;
