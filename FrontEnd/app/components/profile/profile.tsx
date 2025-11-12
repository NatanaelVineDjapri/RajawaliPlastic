"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getProfile, logout, getToken } from "@/services/authService";

const MySwal = withReactContent(Swal);

interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone_number?: string;
  role: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        window.location.href = "/auth/login";
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err: any) {
        MySwal.fire({
          icon: "error",
          title: "Gagal Ambil Data 😔",
          text: err.message || "Terjadi kesalahan saat memuat profile",
          confirmButtonColor: "#dc2626",
        }).then(() => {
          window.location.href = "/auth/login";
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-muted">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null; // kalau user null, udah dialihkan ke login
  }

  return (
    <div className="profile-page d-flex justify-content-center align-items-center vh-100">
      <div
        className="profile-container d-flex justify-content-center align-items-center"
        style={{ marginTop: "100px" }}
      >
        {" "}
        <div className="profile-inner text-center">
          <div className="mb-3">
            <div
              className="profile-avatar rounded-circle bg-light mx-auto"
              style={{ width: 100, height: 100 }}
            ></div>
          </div>

          <div className="text-start mb-4">
            <label className="form-label fw-semibold text-muted">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="form-control mb-3"
              value={user.name}
              readOnly
            />

            <label className="form-label fw-semibold text-muted">Email</label>
            <input
              type="email"
              className="form-control mb-3"
              value={user.email}
              readOnly
            />

            <label className="form-label fw-semibold text-muted">Alamat</label>
            <input
              type="text"
              className="form-control mb-3"
              value={user.address || "-"}
              readOnly
            />

            <label className="form-label fw-semibold text-muted">
              No. Telp
            </label>
            <input
              type="text"
              className="form-control"
              value={user.phone_number || "-"}
              readOnly
            />
          </div>

          <div className="d-flex justify-content-center gap-3">
            <a href="/edit-profile" className="btn profile-btn">
              Ubah Informasi
            </a>

            <button onClick={handleLogout} className="btn profile-btn">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
