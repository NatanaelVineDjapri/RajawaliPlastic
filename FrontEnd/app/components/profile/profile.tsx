"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProfile, logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { label } from "framer-motion/client";

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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: "url('/images/Background_Hero.png')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    position: "relative", 
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div style={backgroundStyle}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            backdropFilter: "blur(4px)",           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            className="bg-white p-5 rounded-4 shadow text-center"
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <div className="mb-3 text-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
              </svg>
            </div>
            
            <h3 className="text-danger fw-bold mb-3">Akses Ditolak</h3>
            <p className="text-muted mb-4">
              Silakan login terlebih dahulu untuk mengakses fitur ini.
            </p>
            
            <div className="d-inline-flex align-items-center justify-content-center text-secondary bg-light px-4 py-2 rounded-pill border">
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <small className="fw-bold">Mengalihkan ke Login...</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
      
      <div
        className="profile-container d-flex justify-content-center align-items-center rounded-4 shadow-lg bg-white bg-opacity-90"
        style={{ 
          marginTop: "80px", 
          padding: "40px",
          maxWidth: "600px",
          width: "90%"
        }}
      >
        <div className="profile-inner text-center w-100">
          {/* Avatar Section */}
          <div className="mb-4">
            <div
              className="profile-avatar rounded-circle mx-auto overflow-hidden position-relative border border-4 border-light shadow-sm"
              style={{ width: 120, height: 120 }}
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
            <div className="mb-3">
              <label className="form-label fw-bold text-secondary small">NAMA LENGKAP</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                value={user.name}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-secondary small">EMAIL</label>
              <input
                type="email"
                className="form-control form-control-lg bg-light"
                value={user.email}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-secondary small">ALAMAT</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                value={user.address || "-"}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-secondary small">NO. TELP</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light"
                value={user.phone_number || "-"}
                readOnly
              />
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Link href="/edit-profile" className="btn btn-primary px-4 py-2 fw-semibold">
              Ubah Informasi
            </Link>

            <button onClick={handleLogout} className="btn btn-outline-danger px-4 py-2 fw-semibold">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;