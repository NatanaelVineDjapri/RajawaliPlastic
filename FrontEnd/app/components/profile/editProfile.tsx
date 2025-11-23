"use client";

import React, { useEffect, useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { getProfile, updateProfile } from "@/services/authService";
import EditProfileSkeleton from "../admincomponents/skeletons/EditProfileSkeleton";

const MySwal = withReactContent(Swal);

const EditProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getProfile();

        setName(user.name || "");
        setEmail(user.email || "");
        setAddress(user.address || "");
        setPhone(user.phone_number || "");
      } catch (err: any) {
        MySwal.fire("Error", "GAGAL MELAKUKAN UPDATE PROFILE, TOLONG ISI FORM DENGAN BENAR!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone_number", phone);

    if (password) formData.append("password", password);
    if (confirmPassword)
      formData.append("password_confirmation", confirmPassword);

    try {
      await updateProfile(formData);

      MySwal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
      });

      window.location.href = "/profile";

    } catch (err: any) {
      MySwal.fire("Error", err.message || "Failed updating profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
   return <EditProfileSkeleton />; 
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/Background_Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4"
        style={{
          background: "linear-gradient(180deg, #1e3a5f, #0b1e30)",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          width: "480px",
        }}
      >
        <div
          className="p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            width: "100%",
            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4 className="fw-bold mb-4 text-center" style={{ color: "#1e3a5f" }}>
            Edit Informasi
          </h4>

          <div className="row">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-muted">
                Your Name
              </label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="form-label fw-semibold text-muted">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="form-label fw-semibold text-muted">
                Address
              </label>
              <input
                type="text"
                className="form-control mb-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-muted">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control mb-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label className="form-label fw-semibold text-muted">
                New Password
              </label>
              <input
                type="password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank"
              />

              <label className="form-label fw-semibold text-muted">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control mb-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn border-0"
              style={{
                background: "linear-gradient(180deg, #1e3a5f, #0b1e30)",
                color: "white",
                borderRadius: "25px",
                padding: "8px 28px",
                fontWeight: 600,
              }}
              disabled={saving}
            >
              {saving ? "Saving..." : "Konfirmasi"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;