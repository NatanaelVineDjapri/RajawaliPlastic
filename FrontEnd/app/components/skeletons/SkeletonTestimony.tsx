"use client";
import React from "react";

export default function TestimonySkeleton() {
  return (
    <section id="testimony" className="testimony-section py-5 text-center">
      <div className="container">

        <div className="mb-4">
          <h2 className="fw-bold mb-4" style={{ fontSize: '3.4rem', color: '#162737' }}>
          Testimoni
        </h2>
        </div>

        <div className="mb-5">

          <div
            className="rounded-4 shadow overflow-hidden placeholder-glow"
            style={{
              height: "500px",
              borderRadius: "15px",
              backgroundColor: "#d9dfe6",
              position: "relative",
            }}
          >
            <div className="placeholder" style={{ width: "100%", height: "100%" }} />
          </div>

    
        </div>

        <div className="row justify-content-center align-items-center gy-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="col-4 col-sm-2 text-center placeholder-glow">
              <div
                className="placeholder bg-secondary"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "10px",
                  margin: "0 auto",
                  objectFit: "contain",
                }}
              ></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
