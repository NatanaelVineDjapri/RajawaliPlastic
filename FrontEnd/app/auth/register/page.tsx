"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-wrapper position-relative d-flex align-items-center justify-content-center vh-100">
      <video
        className="auth-bg-video position-absolute top-0 start-0 w-100 h-100"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/auth.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="auth-overlay position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="container position-relative">
        <div className="row w-100 shadow rounded-4 overflow-hidden auth-card mx-auto">
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center p-5 bg-white">
            <div className="w-100" style={{ maxWidth: "350px" }}>
              <h3 className="fw-semibold mb-3">Create Account</h3>
              <p className="text-muted small mb-4">
                Please fill in the details to register a new account.
              </p>

              <form>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label small fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="form-control rounded-3 p-2"
                    placeholder="Enter your full name..."
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label small fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control rounded-3 p-2"
                    placeholder="Enter your email..."
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label small fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control rounded-3 p-2"
                    placeholder="Enter your password..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gradient w-100 py-2 rounded-3 fw-semibold border-0"
                >
                  Register
                </button>
              </form>

              <p className="mt-4 text-center small text-muted">
                Already have an account?{" "}
                <a href="/auth/login" className="text-decoration-none fw-semibold">
                  Sign in
                </a>
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 auth-image p-0 position-relative">
            <Image
              src="/images/bg_auth.png"
              alt="Background"
              fill
              className="object-fit-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
