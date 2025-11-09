"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile: React.FC = () => {
  return (
    <div className="profile-page d-flex justify-content-center align-items-center vh-100">
      <div className="profile-container d-flex justify-content-center align-items-center">
        <div className="profile-inner text-center">
          <div className="mb-3">
            <div className="profile-avatar rounded-circle bg-light mx-auto"></div>
          </div>

          <div className="text-start mb-4">
            <label className="form-label fw-semibold text-muted">
              Nama Lengkap
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

          <div className="d-flex justify-content-center gap-3">
            <a href="/edit-profile" className="btn profile-btn">
              Ubah Informasi
            </a>

            <a href="/auth/login" className="btn profile-btn">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;