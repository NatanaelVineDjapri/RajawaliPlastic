'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="products-section py-5">
      <Container fluid="md" className="products-container">
        <h2 className="products-title fw-bold text-center mb-5">Produk Kami</h2>

        {/* === Product 1 === */}
        <Row className="align-items-center mb-5 gx-5">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <div className="product-image-wrapper">
              <Image
                src="/images/productSection/product-pp.jpg"
                alt="Polypropylene (PP)"
                fill
                className="product-image"
              />
            </div>
          </Col>
          <Col md={7}>
            <h4 className="fw-bold mb-3 product-name">Polypropylene (PP)</h4>
            <p className="mb-4 product-desc">
              Polypropylene merupakan biji plastik serbaguna dengan kombinasi ketahanan panas, kekakuan, dan ketahanan terhadap bahan kimia.
              Material ini sering digunakan untuk pembuatan peralatan rumah tangga, wadah makanan, furniture ringan, hingga komponen otomotif.
              Sifatnya ringan dan mudah dibentuk menjadikannya pilihan utama untuk produksi skala besar yang memerlukan efisiensi biaya dan daya tahan tinggi.
            </p>
            <Link href="/chat">
              <Button className="order-btn px-4 py-2 fw-semibold rounded-pill">Order Now</Button>
            </Link>
          </Col>
        </Row>

        {/* === Product 2 === */}
        <Row className="align-items-center mb-5 flex-md-row-reverse gx-5">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <div className="product-image-wrapper">
              <Image
                src="/images/productSection/product-pe.jpg"
                alt="Polyethylene (PE)"
                fill
                className="product-image"
              />
            </div>
          </Col>
          <Col md={7}>
            <h4 className="fw-bold mb-3 product-name">Polyethylene (PE)</h4>
            <p className="mb-4 product-desc">
              Polyethylene adalah biji plastik lentur dan tahan benturan, ideal untuk produksi kantong plastik, botol, dan jerigen.
              Tersedia dalam varian HDPE dan LDPE, material ini banyak digunakan karena kekuatannya terhadap kelembapan, fleksibilitas tinggi, serta kemudahan proses cetak.
              Kami juga menyediakan varian warna serta karakteristik bahan sesuai kebutuhan industri Anda.
            </p>
            <Link href="/chat">
              <Button className="order-btn px-4 py-2 fw-semibold rounded-pill">Order Now</Button>
            </Link>
          </Col>
        </Row>

        {/* === Product 3 === */}
        <Row className="align-items-center mb-5 gx-5">
          <Col md={5} className="text-center mb-4 mb-md-0">
            <div className="product-image-wrapper">
              <Image
                src="/images/productSection/product-ps.jpg"
                alt="Polystyrene (PS)"
                fill
                className="product-image"
              />
            </div>
          </Col>
          <Col md={7}>
            <h4 className="fw-bold mb-3 product-name">Polystyrene (PS)</h4>
            <p className="mb-4 product-desc">
              Polystyrene adalah bahan plastik ringan, bening, dan mudah dicetak, sering digunakan untuk pembuatan gelas plastik, mainan, hingga kemasan makanan.
              Dengan varian GPPS (jernih dan kaku) serta HIPS (lebih kuat dan tahan benturan), material ini sangat populer di industri kemasan sekali pakai maupun dekoratif.
            </p>
            <Link href="/chat">
              <Button className="order-btn px-4 py-2 fw-semibold rounded-pill">Order Now</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductsSection;
