"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import { addPartner } from "@/services/partnerService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

export default function CreatePartnerPage() {
  const pageTitle = "Add Partner";

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs = [
    { label: "Partner List", href: "/dashboard/partners" },
    { label: "Add Partner" },
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
    formData.append("link", link);
    if (logo) formData.append("logo", logo);

    try {
      const result = await addPartner(formData);
      MySwal.fire({
        title: "Success!",
        text: result.message || "Partner added successfully!",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });

      setName("");
      setLink("");
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
      <div className="row g-4">
        <div className="col-lg-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3 shadow-sm p-4 h-100 d-flex flex-column"
            id="partnerUploadForm"
          >
            <h5 className="fw-bold mb-3">Partner Details</h5>

            <div className="flex-grow-1 d-flex flex-column gap-3">
              <div>
                <label
                  htmlFor="partnerName"
                  className="form-label fw-semibold text-secondary small mb-1"
                >
                  Partner Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="partnerName"
                  className="form-control p-3 border rounded-3"
                  placeholder="Enter partner name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="partnerLink"
                  className="form-label fw-semibold text-secondary small mb-1"
                >
                  Website Link (Optional)
                </label>
                <input
                  type="url"
                  id="partnerLink"
                  className="form-control p-3 border rounded-3"
                  placeholder="https://partnerwebsite.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="bg-white rounded-3 shadow-sm p-4 h-60 d-flex flex-column">
            <h5 className="fw-bold mb-3">Partner Logo</h5>

            <label
              htmlFor="partnerLogo"
              className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light w-100 flex-grow-1 position-relative"
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
                  alt="Slider Preview"
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  unoptimized
                />
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <Camera size={48} style={{ color: "#9ca3af" }} />
                  <span className="small mt-2">
                    Click to upload (Max 2MB, 16:9)
                  </span>
                </div>
              )}
              <input
                type="file"
                id="partnerLogo"
                className="d-none"
                onChange={handleLogoChange}
                accept="image/png, image/jpeg, image/webp"
                required
              />
            </label>
          </div>
          <div className="mt-3">
            <SubmitButton
              isLoading={isLoading}
              text="Add Partner"
              loadingText="Adding Partner..."
              form="partnerUploadForm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
