"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/TempButton";
import { addGallery } from "@/services/galleryService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

export default function CreateGalleryPage() {
  const pageTitle = "Add Gallery Item";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs = [
    { label: "Gallery List", href: "/dashboard/gallery" },
    { label: "Add Gallery" },
  ];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await addGallery(formData);
      MySwal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      setTitle("");
      setDescription("");
      setImage(null);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
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
          <div className="col-12 col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-4">Gallery Details</h5>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column">
                  <label
                    htmlFor="title"
                    className="form-label fw-semibold text-secondary small mb-1"
                  >
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control p-3 border rounded-3"
                    placeholder="Enter gallery title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    placeholder="Enter gallery description (optional)"
                    rows={9}
                    style={{ minHeight: "150px", resize: "vertical" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4 h-60">
              <h5 className="fw-bold mb-4">Gallery Image</h5>

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
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Slider Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    unoptimized
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <Camera size={48} style={{ color: "#9ca3af" }} />
                    <span className="small mt-2 text-center">
                      Click to upload (Max 2MB, 16:9)
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  className="d-none"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/webp"
                  required
                />
              </label>
            </div>

            <div className="d-grid">
              <SubmitButton
                isLoading={isLoading}
                text="Add Gallery Item"
                loadingText="Uploading..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}