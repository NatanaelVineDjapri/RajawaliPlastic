"use client";

<<<<<<< HEAD:FrontEnd/app/dashboard/hero/edit/page.tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Camera, Trash2 } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import { addSlider, deleteSlider, getSliders } from "@/services/heroService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

interface SliderItem {
  id: string;
  image: string;
  created_at: string;
}

export default function SliderManagementPage() {
  const pageTitle = "Homepage Slider Management";

  const [sliderImage, setSliderImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sliders" },
  ];

  async function fetchSliders() {
    setIsListLoading(true);
    try {
      const result = await getSliders();
      if (Array.isArray(result.data)) {
        setSliders(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch sliders:", error);
      MySwal.fire("Error", "Failed to load slider data.", "error");
    } finally {
      setIsListLoading(false);
    }
  }

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSliderImage(file);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (sliderImage) {
      formData.append("image", sliderImage);
    } else {
      MySwal.fire("Error", "Please select a slider image.", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const result = await addSlider(formData);
      MySwal.fire({
        title: "Success!",
        text: result.message,
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });

      setSliderImage(null);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
      fetchSliders();
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

  const handleDelete = (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#007bff",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlider(id)
          .then(() => {
            MySwal.fire(
              "Deleted!",
              "The slider image has been deleted.",
              "success"
            );
            fetchSliders();
          })
          .catch((error) => {
            MySwal.fire("Failed", error.message, "error");
          });
      }
    });
  };

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <div className="row g-4">
        <div className="col-lg-5">
          <form
            onSubmit={handleSubmit}
            id="sliderUploadForm"
            className="bg-white rounded-3 shadow-sm p-4 d-flex flex-column"
            style={{ height: "60vh" }}
=======
import React from 'react';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditHeroPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Applying hero section changes...");
    router.push('/dashboard/hero'); 
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="fs-3 fw-semibold text-dark mb-4">Hero</h1>
      <div className="bg-info-subtle border border-info-subtle rounded-3 p-3 mb-0">
        <h2 className="fs-5 fw-semibold text-info mb-0">Edit Hero Section</h2>
      </div>

      <form
        className="bg-white rounded-3 shadow-sm p-4 d-flex flex-column align-items-center gap-4"
        onSubmit={handleSubmit}
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-5 text-muted small"
          style={{ width: '200px', height: '200px', cursor: 'pointer' }}
        >
          <Camera size={48} className="text-secondary" />
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <button
            type="submit"
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#9ca3af',
              fontWeight: 600,
              border: 'none',
              padding: '0.6rem 1.5rem',
            }}
>>>>>>> 17ba7601c7b87476a6c3f877c7b0b228475cb739:FrontEnd/app/dashboard/hero/upload/page.tsx
          >
            <h5 className="fw-bold mb-3">Upload New Slider Image</h5>

            <label
              htmlFor="sliderImage"
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
                  <span className="small mt-2">
                    Click to upload (Max 2MB, 16:9)
                  </span>
                </div>
              )}
              <input
                type="file"
                id="sliderImage"
                className="d-none"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/webp"
                required
              />
            </label>
          </form>
          <div className="mt-3">
            <SubmitButton
              isLoading={isLoading}
              text="Add Slider"
              loadingText="Uploading..."
              form="sliderUploadForm"
            />
          </div>
        </div>
<<<<<<< HEAD:FrontEnd/app/dashboard/hero/edit/page.tsx
        <div className="col-lg-7">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">
              Current Active Sliders ({sliders.length})
            </h5>

            {isListLoading ? (
              <div className="text-center p-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
                <p className="mt-2 text-muted">Loading...</p>
              </div>
            ) : (
              <div className="list-group">
                {sliders.length === 0 ? (
                  <p className="text-muted text-center p-3">
                    No slider images uploaded yet.
                  </p>
                ) : (
                  <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                    {sliders.map((slider) => (
                      <div
                        key={slider.id}
                        className="list-group-item d-flex justify-content-between align-items-center p-3"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <Image
                            src={slider.image}
                            alt={`Slider ${slider.id}`}
                            width={100}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                            unoptimized
                          />
                          <small className="text-muted">
                            Uploaded:{" "}
                            {new Date(slider.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(slider.id)}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
=======
      </form>
>>>>>>> 17ba7601c7b87476a6c3f877c7b0b228475cb739:FrontEnd/app/dashboard/hero/upload/page.tsx
    </div>
  );
}
