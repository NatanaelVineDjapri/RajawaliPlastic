'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/TempButton";
import { addSlider, deleteSlider, getSliders } from "@/services/heroService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

interface HeroItem {
  id: string;
  image_base64: string;
  created_at: string;
}

export default function SliderManagementPage() {
  const pageTitle = "Homepage Slider Management";
  const router = useRouter();
  const [sliderImage, setSliderImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sliders, setSliders] = useState<HeroItem[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sliders" },
  ];

  async function fetchSliders() {
    setIsListLoading(true);
    try {
      const result = await getSliders();
      if (Array.isArray(result.data)) setSliders(result.data);
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
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!sliderImage) {
      MySwal.fire("Error", "Please select a slider image.", "warning");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", sliderImage);

    try {
      const result = await addSlider(formData);
      MySwal.fire({ title: "Success!", text: result.message, icon: "success", confirmButtonColor: "#0d6efd" });
      setSliderImage(null);
      if (previewImage) { URL.revokeObjectURL(previewImage); setPreviewImage(null); }
      fetchSliders();
      router.push("/dashboard/hero");
    } catch (error) {
      let msg = "An unknown error occurred.";
      if (error instanceof Error) msg = error.message;
      MySwal.fire({ title: "Oops...", text: msg, icon: "error", confirmButtonColor: "#dc3545" });
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
        deleteSlider(id).then(() => {
          MySwal.fire("Deleted!", "The slider image has been deleted.", "success");
          fetchSliders();
        }).catch((error) => {
          MySwal.fire("Failed", error.message, "error");
        });
      }
    });
  };

  return (
    <div className="w-100 px-2 px-md-4">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <form
            onSubmit={handleSubmit}
            id="sliderUploadForm"
            className="bg-white rounded-3 shadow-sm p-3 p-md-4 d-flex flex-column"
            style={{ minHeight: "50vh" }}
          >
            <h5 className="fw-bold mb-3 text-center text-md-start">Upload New Slider Image</h5>

            <label
              htmlFor="sliderImage"
              className="d-flex flex-column align-items-center justify-content-center p-3 p-md-4 text-muted rounded-3 border-2 border-dashed bg-light w-100 flex-grow-1 position-relative"
              style={{ minHeight: "320px", cursor: "pointer", transition: "background-color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
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
                  <span className="small mt-2">Click to upload (Max 2MB, 16:9)</span>
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
          <div className="mt-3 d-grid">
            <SubmitButton
              isLoading={isLoading}
              text="Add Slider"
              loadingText="Uploading..."
              form="sliderUploadForm"
            />
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 h-100">
            <h5 className="fw-bold mb-4 text-center text-md-start">
              Current Active Sliders ({sliders.length})
            </h5>

            {isListLoading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Loading...</p>
              </div>
            ) : (
              <div className="list-group">
                {sliders.length === 0 ? (
                  <p className="text-muted text-center p-3">No slider images uploaded yet.</p>
                ) : (
                  <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                    {sliders.map((slider) => (
                      <div
                        key={slider.id}
                        className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 gap-md-3 p-2 p-md-3"
                      >
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                          <Image
                            src={`data:image/jpeg;base64,${slider.image_base64}`}
                            alt={`Slider ${slider.id}`}
                            width={100}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                          />
                          <small className="text-muted">
                            Uploaded: {new Date(slider.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger mt-2 mt-md-0"
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
    </div>
  );
}