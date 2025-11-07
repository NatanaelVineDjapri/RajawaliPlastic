'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="position-relative"
      style={{
        background: 'linear-gradient(0deg, #162737, #3F719D)',
        color: 'white',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        marginTop: '-50px',
        paddingTop: '40px',
        paddingBottom: '120px',
        minHeight: '700px',
        overflow: 'hidden',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={12} className="position-relative" style={{ minHeight: '800px' }}>
            
            <h2
              className="fw-bold"
              style={{
                fontSize: '3rem',
                lineHeight: '1.1',
                color: 'white',
                position: 'absolute',
                top: '20px',
                left: '14%',
                zIndex: 4,
                textAlign: 'left',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Tentang <br /> Kami
            </h2>

            <div
              style={{
                position: 'absolute',
                top: '100px',
                left: '50%',
                transform: 'translateX(-5%)',
                width: '650px',
                maxWidth: '650px',
                zIndex: 2, 
              }}
            >
              <Image
                src="/images/About_Image.jpg"
                alt="Rajawali Plastik About Image"
                width={650}
                height={400}
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              />
            </div>

              <Card
                className="p-4 shadow-lg border-0"
                style={{
                  backgroundColor: '#5D6E83',
                  color: '#e6e6e6',
                  borderRadius: '10px',
                  position: 'absolute',
                  top: '150px',
                  left: '10%',
                  zIndex: 3,
                  width: '45%',
                  maxWidth: '550px',
                  minHeight: '500px',
                  paddingTop: '30px',
                }}
              >

              <Card.Body>
                <h5 className="fw-bold mb-3 text-white">PROFIL PERUSAHAAN</h5>
                <p>
                  <strong>Rajawali Plastik</strong> merupakan usaha yang bergerak di bidang
                  distribusi <strong>bahan baku plastik</strong> untuk berbagai kebutuhan industri.
                  Dengan pengalaman dan jaringan kerja yang luas, kami berkomitmen untuk
                  menghadirkan produk berkualitas serta layanan yang cepat dan profesional.
                </p>

                <p>
                  Melalui hubungan kerja sama yang saling menguntungkan antara supplier dan klien,
                  Rajawali Plastik terus berupaya menjadi mitra terpercaya dalam mendukung kelancaran
                  dan pertumbuhan industri plastik.
                </p>

                <h5 className="fw-bold mt-4">VISI</h5>
                <p>
                  Menjadi mitra terpercaya dalam penyediaan bahan baku plastik berkualitas.
                </p>

                <h5 className="fw-bold mt-4">MISI</h5>
                <ul className="list-unstyled">
                  <li><i className="bi bi-check-circle-fill me-2"></i>Menyediakan bahan baku plastik yang berkualitas dengan harga kompetitif.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>Memberikan pelayanan yang responsif dan berorientasi pada kebutuhan klien.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>Menjalin kerja sama jangka panjang yang dilandasi kepercayaan dan profesionalisme.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>Menjaga integritas dan transparansi dalam setiap proses bisnis.</li>
                  <li><i className="bi bi-check-circle-fill me-2"></i>Berkontribusi terhadap pertumbuhan industri plastik.</li>
                </ul>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
