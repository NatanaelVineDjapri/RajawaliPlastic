"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import { addTestimonial } from "@/services/testimonialService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

export default function CreateTestimonyPage() {
  const pageTitle = "Add Testimony";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs = [
    { label: "Testimony List", href: "/dashboard/testimony" },
    { label: "Add Testimony" },
  ];

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      if (previewLogo) URL.revokeObjectURL(previewLogo);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (logo) formData.append("logo", logo);

    try {
      const result = await addTestimonial(formData);
      MySwal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });

      setName("");
      setDescription("");
      setLogo(null);
      if (previewLogo) {
        URL.revokeObjectURL(previewLogo);
        setPreviewLogo(null);
      }
    } catch (error) {
      let msg = "An unknown error occurred.";
      if (error instanceof Error) msg = error.message;
      MySwal.fire({
        title: "Oops...",
        text: msg,
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
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
            <div className="bg-white rounded-3 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-4">Testimony Details</h5>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column">
                  <label
                    htmlFor="clientName"
                    className="form-label fw-semibold text-secondary small mb-1"
                  >
                    Client Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    className="form-control p-3 border rounded-3"
                    placeholder="Enter client or company name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold text-secondary small mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control p-3 border rounded-3"
                    placeholder="Enter testimony description..."
                    rows={9}
                    style={{ minHeight: "150px", resize: "vertical" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4 h-60">
              <h5 className="fw-bold mb-4">Client Logo</h5>

              <label
                className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light w-100 position-relative"
                style={{
                  minHeight: "320px",
                  borderColor: "#d1d5db",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
              >
                {previewLogo ? (
                  <Image
                    src={previewLogo}
                    alt="Logo Preview"
                    fill
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                      padding: "20px",
                    }}
                  />
                ) : (
                  <>
                    <div className="d-flex flex-column align-items-center">
                      <Camera size={48} style={{ color: "#9ca3af" }} />
                      <span className="small mt-2">
                        Click to upload (Max 2MB, 16:9)
                      </span>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  className="d-none"
                  onChange={handleLogoChange}
                  accept="image/png, image/jpeg, image/webp"
                  required
                />
              </label>
            </div>

            <div className="d-grid">
              <SubmitButton
                isLoading={isLoading}
                text="Add Testimony"
                loadingText="Saving..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
