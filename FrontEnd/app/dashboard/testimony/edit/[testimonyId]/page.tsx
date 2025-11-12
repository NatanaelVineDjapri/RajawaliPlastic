"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Camera } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import {
  getTestimonialById,
  updateTestimonial,
} from "@/services/testimonialService";

const MySwal = withReactContent(Swal);

interface Testimonial {
  _id?: string;
  id?: string | number;
  name: string;
  description: string;
  logo?: string;
  updated_at?: string;
  created_at?: string;
}

export default function EditTestimonyPage() {
  const { testimonyId } = useParams();
  const router = useRouter();

  const [testimony, setTestimony] = useState<Testimonial | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageTitle = "Edit Testimony";
  const breadcrumbs = [
    { label: "Testimony List", href: "/dashboard/testimony" },
    { label: "Edit Testimony" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTestimonialById(testimonyId as string);
        const data = res.data;

        if (!data) {
          MySwal.fire("Oops...", "Testimonial not found", "error");
          router.push("/dashboard/testimony");
          return;
        }

        setTestimony(data);
        setName(data.name);
        setDescription(data.description || "");
        setPreviewLogo(data.logo || null);
      } catch (err: any) {
        MySwal.fire(
          "Error",
          err.message || "Failed to fetch testimonial.",
          "error"
        );
        router.push("/dashboard/testimony");
      }
    };

    if (testimonyId) fetchData();
  }, [testimonyId, router]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      if (previewLogo) URL.revokeObjectURL(previewLogo);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!testimony) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (logoFile) formData.append("logo", logoFile);

    try {
      const res = await updateTestimonial(testimony._id || testimony.id!, formData);
      MySwal.fire({
        title: "Success!",
        text: res.message || "Testimonial updated successfully!",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      router.push("/dashboard/testimony");
    } catch (err: any) {
      MySwal.fire("Error", err.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!testimony)
    return <div className="p-5 text-center">Loading testimonial...</div>;

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <h5 className="fw-bold mb-4">Testimony Details</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Client Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control p-3 border rounded-3"
                  placeholder="Enter client name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Description
                </label>
                <textarea
                  className="form-control p-3 border rounded-3"
                  placeholder="Write description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={10}
                  style={{ minHeight: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="bg-white rounded-3 shadow p-4 d-flex flex-column justify-content-between"
            style={{ height: "60vh" }}
          >
            <div>
              <h5 className="fw-bold mb-3">Client Logo</h5>

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
                {previewLogo ? (
                  <Image
                    src={previewLogo}
                    alt="Logo Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    unoptimized
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <Camera size={48} style={{ color: "#9ca3af" }} />
                    <span className="small mt-2">
                      Click to upload (Max 2MB, 1:1)
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  id="sliderImage"
                  className="d-none"
                  onChange={handleLogoChange}
                  accept="image/png, image/jpeg, image/webp"
                  required={!previewLogo}
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <SubmitButton
              isLoading={isLoading}
              text="Update Testimony"
              loadingText="Updating..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
