'use client';
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";

const testimonies = [
  {
    image: "/images/testimoniesSection/testi1.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla at placerat efficitur, tortor nisl tincidunt est.",
    author: "Lorem Lorem",
  },
  {
    image: "/images/testimoniesSection/testi2.jpg",
    text: "Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    author: "Ipsum Dolor",
  },
  {
    image: "/images/testimoniesSection/testi3.jpg",
    text: "Curabitur vehicula, augue a porttitor iaculis, erat leo luctus massa, sit amet feugiat libero eros ut nunc.",
    author: "Amet Consectetur",
  },
];

const partners = [
  "/images/partnersSection/partner.png",
  "/images/partnersSection/partner.png",
  "/images/partnersSection/partner.png",
  "/images/partnersSection/partner.png",
  "/images/partnersSection/partner.png",
  "/images/partnersSection/partner.png",
];

export default function TestimonySection() {
  return (
    <section id="testimony" className="testimony-section">
      <div className="container text-center">
        <h2 className="fw-bold mb-4" style={{ fontSize: '3.4rem', color: '#162737' }}>Testimoni</h2>

        <div className="mb-5"> 
          <Carousel indicators={false} className="rounded-4 shadow">
            {testimonies.map((item, index) => (
              <Carousel.Item 
                key={index}
              >
                <div style={{ position: 'relative', height: '500px' }}>
                    <Image
                      src={item.image}
                      alt={`Testimony ${index + 1}`}
                      fill 
                      className="d-block w-100"
                      style={{ objectFit: "cover", borderRadius: "15px" }}
                    />
                </div>
                
                <Carousel.Caption className="d-none d-md-block bg-white bg-opacity-75 p-3 rounded text-dark">
                  <p className="fst-italic">
                    <i className="bi bi-quote text-primary fs-3"></i> {item.text}
                  </p>
                  <small className="fw-bold">- {item.author}</small>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="row justify-content-center align-items-center gy-4">
          {partners.map((logo, idx) => (
            <div className="col-4 col-sm-2 text-center" key={idx}>
              <Image
                src={logo}
                alt={`Partner ${idx}`}
                width={100}
                height={100}
                className="img-fluid"
                style={{ maxHeight: "80px", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}