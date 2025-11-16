'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getTestimonials } from "@/services/testimonialService";
import { getPartners } from "@/services/partnerService";

export default function TestimonySection() {
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const t = await getTestimonials();
        const p = await getPartners();

        setTestimonies(t.data);
        setPartners(p.data);
      } catch (err) {
        console.error("Error loading testimony or partners: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <section id="testimony" className="text-center py-5">
        <p>Memuat testimoni...</p>
      </section>
    );
  }

  return (
    <section id="testimony" className="testimony-section">
      <div className="container text-center">
        <h2 className="fw-bold mb-4" style={{ fontSize: '3.4rem', color: '#162737' }}>
          Testimoni
        </h2>

        {/* ================= SLIDER TESTIMONI ================= */}
        <div className="mb-5">
          <Carousel indicators={false} className="rounded-4 shadow">
            {testimonies.map((item, index) => (
              <Carousel.Item key={index}>
                <div style={{ position: "relative", height: "500px" }}>
                  <Image
                    src={
                      item.logo_base64
                        ? `data:image/jpeg;base64,${item.logo_base64}`
                        : "/images/default-image.jpg"
                    }
                    alt={`Testimony ${index + 1}`}
                    fill
                    className="d-block w-100"
                    style={{ objectFit: "cover", borderRadius: "15px" }}
                  />
                </div>

                <Carousel.Caption className="d-none d-md-block bg-white bg-opacity-75 p-3 rounded text-dark">
                  <p className="fst-italic">
                    <i className="bi bi-quote text-primary fs-3"></i>{" "}
                    {item.description}
                  </p>
                  <small className="fw-bold">- {item.name}</small>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* ================== PARTNERS ================== */}
        <div className="row justify-content-center align-items-center gy-4">
          {partners.map((partner, idx) => (
            <div className="col-4 col-sm-2 text-center" key={idx}>
              <Image
                src={
                  partner.logo_base64
                    ? `data:image/png;base64,${partner.logo_base64}`
                    : "/images/default-partner.png"
                }
                alt={`${partner.name}`}
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