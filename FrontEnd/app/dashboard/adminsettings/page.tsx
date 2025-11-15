"use client";

import React, { useState, useEffect, FormEvent } from "react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getProfile, updateProfile } from "@/services/authService";

const MySwal = withReactContent(Swal);

export interface User {
  id: string;
  name: string;
  address?: string | null;
  phone_number?: string | null;
  email?: string;
  role?: string;
  photo_base64?: string | null;
}

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const pageTitle = "Edit Profile";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getProfile();

        setName(user.name || "");
        setAddress(user.address || "");
        setPhone(user.phone_number || "");
        setRole(user.role || "");
      } catch (err: any) {
        MySwal.fire("Error", err.message, "error");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
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
    } catch (err: any) {
      MySwal.fire("Error", err.message || "Failed to update profile", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="bg-white p-4 rounded-3 shadow"
              style={{ height: "61vh" }}
            >
              <h5 className="fw-bold mb-2">Profile Information</h5>
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    Address
                  </label>
                  <input
                    className="form-control p-3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    Phone Number
                  </label>
                  <input
                    className="form-control p-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white p-4 rounded-3 shadow">
              <h5 className="fw-bold ">Security</h5>

              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    Role
                  </label>
                  <input className="form-control p-3" value={role} disabled />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank if not changing"
                  />
                </div>

                <div>
                  <label className="form-label fw-semibold small text-secondary">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control p-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <SubmitButton
                isLoading={isLoading}
                text="Save Changes"
                loadingText="Updating..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
