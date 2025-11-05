'use client';
import React from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-5"
      style={{
        background: 'linear-gradient(135deg, #0b2239, #163a5f)',
        color: 'white',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        marginTop: '-50px',
        paddingTop: '80px',
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* TEXT SIDE */}
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="fw-bold mb-4 text-center text-md-start">
              <span style={{ fontSize: '3rem', lineHeight: '1.1' }}>
                Tentang <br /> Kami
              </span>
            </h2>

            <Card
              className="p-4 shadow-sm border-0"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#e6e6e6',
                borderRadius: '10px',
              }}
            >
              <Card.Body>
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
                <ul>
                  <li>Menyediakan bahan baku plastik yang berkualitas dengan harga kompetitif.</li>
                  <li>
                    Memberikan pelayanan yang responsif dan berorientasi pada kebutuhan klien.
                  </li>
                  <li>
                    Menjalin kerja sama jangka panjang yang dilandasi kepercayaan dan profesionalisme.
                  </li>
                  <li>Menjaga integritas dan transparansi dalam setiap proses bisnis.</li>
                  <li>
                    Berkontribusi terhadap pertumbuhan industri plastik melalui pelayanan yang efisien
                    dan berkelanjutan.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* IMAGE SIDE */}
          <Col md={6} className="text-center">
            <Image
              src="/images/About_Image.jpg"
              alt="Rajawali Plastik About Image"
              width={500}
              height={400}
              style={{
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
