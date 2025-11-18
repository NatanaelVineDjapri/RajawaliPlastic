"use client";

import React from "react";
import { Placeholder } from "react-bootstrap";

const ProfileSkeleton = () => {
  return (
    <div className="profile-page d-flex justify-content-center align-items-center vh-100">
      <div
        className="profile-container d-flex justify-content-center align-items-center"
        style={{ marginTop: "100px" }}
      >
        <div className="profile-inner text-center" style={{ width: "450px" }}>
          
          {/* Avatar Skeleton */}
          <div className="mb-3">
            <div
              className="profile-avatar rounded-circle mx-auto overflow-hidden position-relative shadow"
              style={{ width: 100, height: 100 }}
            >
              <Placeholder
                animation="wave"
                className="w-100 h-100 bg-secondary"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>

          {/* FORM AREA */}
          <div className="text-start mb-4">

            {/* Nama Lengkap */}
            <label className="form-label fw-semibold text-muted">
              <Placeholder
                animation="wave"
                className="bg-secondary d-inline-block"
                style={{ width: "120px", height: "14px", borderRadius: "4px" }}
              />
            </label>
            <Placeholder
              animation="wave"
              className="bg-secondary d-block mb-3"
              style={{ width: "100%", height: "38px", borderRadius: "6px" }}
            />

            {/* Email */}
            <label className="form-label fw-semibold text-muted">
              <Placeholder
                animation="wave"
                className="bg-secondary d-inline-block"
                style={{ width: "80px", height: "14px", borderRadius: "4px" }}
              />
            </label>
            <Placeholder
              animation="wave"
              className="bg-secondary d-block mb-3"
              style={{ width: "100%", height: "38px", borderRadius: "6px" }}
            />

            {/* Alamat */}
            <label className="form-label fw-semibold text-muted">
              <Placeholder
                animation="wave"
                className="bg-secondary d-inline-block"
                style={{ width: "90px", height: "14px", borderRadius: "4px" }}
              />
            </label>
            <Placeholder
              animation="wave"
              className="bg-secondary d-block mb-3"
              style={{ width: "100%", height: "38px", borderRadius: "6px" }}
            />

            {/* No Telp */}
            <label className="form-label fw-semibold text-muted">
              <Placeholder
                animation="wave"
                className="bg-secondary d-inline-block"
                style={{ width: "70px", height: "14px", borderRadius: "4px" }}
              />
            </label>
            <Placeholder
              animation="wave"
              className="bg-secondary d-block"
              style={{ width: "100%", height: "38px", borderRadius: "6px" }}
            />
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-center gap-3 mt-2">
            <Placeholder
              animation="wave"
              className="bg-secondary rounded-3"
              style={{ width: 133, height: 38 }}
            />
            <Placeholder
              animation="wave"
              className="bg-secondary rounded-3"
              style={{ width: 82, height: 38 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
