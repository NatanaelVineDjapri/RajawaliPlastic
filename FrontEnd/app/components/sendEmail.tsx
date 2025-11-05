"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css"; // tempat CSS tambahan

const SendEmail: React.FC = () => {
  return (
    <section
      className="py-5 contact-section"
      style={{
        backgroundImage: "url('/images/bg_daun.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container text-light">
        <div className="row align-items-center g-5">
          {/* Kiri: Text */}
          <div className="col-md-5 text-md-start text-center">
            <h2 className="contact-title">
              Send Us an <span>Email!</span>
            </h2>
            <p className="mt-3 fs-6 fw-light">
              Tolong tinggalkan masukan untuk kami, karena kami terus berupaya
              untuk menjadi lebih baik!
            </p>
          </div>

          {/* Kanan: Form */}
          <div className="col-md-7">
            <form className="bg-light bg-opacity-75 p-4 rounded-4 shadow-sm">
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control rounded-4 p-2"
                    placeholder="Enter Name..."
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control rounded-4 p-2"
                    placeholder="Enter Email..."
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control rounded-4 p-2"
                  rows={5}
                  placeholder="Message"
                ></textarea>
              </div>

              <button type="submit" className="custom-btn btn px-4 fw-semibold">
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendEmail;
