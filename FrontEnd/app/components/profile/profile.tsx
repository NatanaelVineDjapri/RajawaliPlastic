"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getProfile, logout } from "@/services/authService";
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

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
  const router = useRouter(); 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error("Gagal ambil profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

 useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 500000); // 5 Detik

      return () => clearTimeout(timer);
    }
  }, [loading, user, router]);
  
  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <ProfileSkeleton/>
    );
  }
  const centerContainerClass = "d-flex flex-column align-items-center justify-content-center vh-100";
  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "50px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    maxWidth: "450px",
    width: "90%",
    textAlign: "center",
  };
  // B. Loading Kelar TAPI User Kosong -> Tampilkan Skeleton Redup + Pesan
  if (!user) {
    return (
      // Container Full Screen dengan Background Abu-abu muda (bg-light)
      <div className="d-flex align-items-center justify-content-center vh-100">
        
        {/* Card Putih di Tengah */}
        <div 
          className="bg-white p-5 rounded shadow text-center"
          style={{ 
            maxWidth: "500px", 
            width: "90%",
            border: "1px solid #e0e0e0" // Border tipis biar rapi
          }}
        >
          {/* Icon */}
          <div className="text-danger mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
            </svg>
          </div>
          
          <h3 className="fw-bold text-dark mb-3">Akses Ditolak</h3>
          <p className="text-muted mb-4">
            Sesi Anda telah berakhir atau Anda belum login. Silakan login kembali untuk melanjutkan.
          </p>
          
          {/* Indikator Loading Redirect */}
          <div className="d-inline-flex align-items-center justify-content-center text-primary bg-light px-4 py-2 rounded-pill">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <small className="fw-bold">Mengalihkan ke Login...</small>
          </div>
        </div>
      </div>
    );
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
              className="profile-avatar rounded-circle mx-auto overflow-hidden position-relative"
              style={{ width: 100, height: 100 }}
            >
              <Image
                src="/images/pfp.jpg" 
                alt="Profile Picture"
                fill 
                style={{ objectFit: "cover" }} 
              />
            </div>
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
            <Link href="/edit-profile" className="btn profile-btn">
              Ubah Informasi
            </Link>

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