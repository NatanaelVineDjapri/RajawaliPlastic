"use client";

import React, { useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { login } from "@/services/authService";

const MySwal = withReactContent(Swal);

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });

      await MySwal.fire({
        icon: "success",
        title: "Berhasil masuk 🎉",
        text: `Selamat datang kembali, ${res.user?.name || "User"}!`,
        showConfirmButton: false,
        timer: 2000,
        background: "#fff",
      });

      if (res.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      await MySwal.fire({
        icon: "error",
        title: "Login gagal ❌",
        text: error.message || "Terjadi kesalahan, silakan coba lagi.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        background: "#fff",
      });
    } finally {
      setLoading(false);
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
          <div className="col-lg-6 col-md-12 auth-image p-0 position-relative order-1 order-lg-2">
            <Image
              src="/images/bg_auth.png"
              alt="Background"
              fill
              className="object-fit-cover"
            />
          </div>

          <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center p-5 bg-white order-2 order-lg-1">
            <div className="auth-form-wrapper w-100">
              <h3 className="fw-semibold mb-3">Sign in</h3>
              <p className="text-muted small mb-4">
                Mari sign-in ke akun anda!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label small fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control rounded-3 p-2"
                    placeholder="Isi email.."
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    placeholder="Isi password.."
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label
                      className="form-check-label small text-muted"
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-gradient w-100 py-2 rounded-3 fw-semibold border-0 text-white"
                >
                  {loading ? "Memproses..." : "Sign in"}
                </button>
              </form>

              <p className="mt-4 text-center small text-muted">
                Belum punya akun?{" "}
                <a
                  href="/auth/register"
                  className="text-decoration-none fw-semibold"
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
