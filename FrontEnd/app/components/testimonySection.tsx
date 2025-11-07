"use client";
import Image from "next/image";
import React from "react";
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
  "/images/partnersSection/nivea.png",
  "/images/partnersSection/apple.png",
  "/images/partnersSection/mcd.png",
  "/images/partnersSection/shell.png",
  "/images/partnersSection/dove.png",
  "/images/partnersSection/chanel.png",
];

export default function TestimonySection() {
  return (
    <section id="testimony" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Testimoni</h2>
        <hr className="mx-auto mb-5" style={{ width: "100px", borderTop: "3px solid #999" }} />

        {/* Carousel Section */}
        <div id="testimonyCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-inner rounded-4 shadow">
            {testimonies.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <Image
                  src={item.image}
                  alt={`Testimony ${index + 1}`}
                  width={1000}
                  height={500}
                  className="d-block w-100"
                  style={{ objectFit: "cover", borderRadius: "15px" }}
                />
                <div className="carousel-caption d-none d-md-block bg-white bg-opacity-75 p-3 rounded text-dark">
                  <p className="fst-italic">
                    <i className="bi bi-quote text-primary fs-3"></i> {item.text}
                  </p>
                  <small className="fw-bold">- {item.author}</small>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonyCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonyCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Partners Section */}
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