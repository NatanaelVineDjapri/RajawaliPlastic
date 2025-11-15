"use client";

import React, { useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 

const MySwal = withReactContent(Swal);

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return MySwal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: "Mohon isi semua field yang wajib diisi.",
        confirmButtonColor: "#facc15",
        background: "#fffbea",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      return MySwal.fire({
        icon: "error",
        title: "Password Tidak Cocok",
        text: "Pastikan password dan konfirmasi password sama ya!",
        confirmButtonColor: "#ef4444",
        background: "#fef2f2",
      });
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone_number: formData.phone, 
        password: formData.password,
        password_confirmation: formData.confirmPassword, 
      });

      MySwal.fire({
        icon: "success",
        title: "Registrasi Berhasil 🎉",
        text: "Akun dibuat. Mengalihkan ke halaman login...", // Teks diubah
        
        timer: 2000, 
        timerProgressBar: true, 
        showConfirmButton: false, 
        
      }).then(() => {
        router.push("/auth/login"); 
      });

    } catch (err: any) {
      MySwal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: err.message || "Tolong isi form dengan benar sebelum mengirim.",
        confirmButtonColor: "#dc2626",
        background: "#fef2f2",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-page-wrapper position-relative d-flex align-items-center justify-content-center">
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
        <div className="row w-100 shadow rounded-4 overflow-hidden auth-card mx-auto flex-column flex-lg-row">
          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center p-5 bg-white order-2 order-lg-1">
            <div className="auth-form-wrapper w-100">
              <h3 className="fw-semibold mb-3">Create Account</h3>
              <p className="text-muted small mb-4">
                Mohon mengisi data untuk membuat akun
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="form-label small fw-semibold"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi Nama Lengkap..."
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label small fw-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi email..."
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="address"
                        className="form-label small fw-semibold"
                      >
                        Alamat
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi alamat..."
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="mb-3">
                      <label
                        htmlFor="phone"
                        className="form-label small fw-semibold"
                      >
                        No. Telpon
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi nomor telepon..."
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label small fw-semibold"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi password..."
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label small fw-semibold"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control rounded-3 p-2"
                        placeholder="Isi kembali password..."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-gradient w-100 py-2 rounded-3 fw-semibold border-0 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center small text-muted">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login" 
                  className="text-decoration-none fw-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 auth-image p-0 position-relative order-1 order-lg-2">
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