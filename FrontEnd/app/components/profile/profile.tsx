"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/Background_Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Outer Gradient Box */}
      <div
        className="p-4 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(180deg, #1e3a5f, #0b1e30)",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          width: "450px",
        }}
      >
        {/* Inner White Box */}
        <div
          className="p-4 text-center"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            width: "100%",
            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Avatar */}
          <div className="mb-3">
            <div
              className="rounded-circle bg-light mx-auto"
              style={{
                width: "90px",
                height: "90px",
                border: "4px solid #1e3a5f",
              }}
            ></div>
          </div>

          {/* Profil Info (non-editable) */}
          <div className="text-start mb-4">
            <label className="form-label fw-semibold text-muted">
              Your Name
            </label>
            <input
              type="text"
              className="form-control mb-3"
              value="Jonas Khanwald"
              readOnly
            />

            <label className="form-label fw-semibold text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              value="jonas.kahnwald@gmail.com"
              readOnly
            />
          </div>

          {/* Tombol */}
          <div className="d-flex justify-content-center gap-3">
            <a
              href="/edit-profile"
              className="btn border-0"
              style={{
                background: "linear-gradient(180deg, #1e3a5f, #0b1e30)",
                color: "white",
                borderRadius: "25px",
                padding: "6px 22px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Ubah Informasi
            </a>

            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: "25px",
                padding: "6px 22px",
                fontWeight: 600,
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
