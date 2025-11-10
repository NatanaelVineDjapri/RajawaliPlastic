"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTestimonialById, updateTestimonial } from "@/services/testimonialService";
import { ArrowLeft, Save, Edit3 } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  _id: string;
  name: string;
  logo: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const EditTestimonialPage = () => {
  const { testimonyId } = useParams();
  const router = useRouter();

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getTestimonialById(testimonyId as string);
      const data = response.data; // ambil data di dalam response

      setTestimonial(data);
      setName(data.name);
      setDescription(data.description);
      setPreview(data.logo);
    } catch (err) {
      console.error("Error fetching testimonial:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [testimonyId]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (logo) formData.append("logo", logo);

    try {
      await updateTestimonial(testimonyId as string, formData);
      router.push("/dashboard/testimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (loading) return <div className="text-center py-5 text-muted">Loading testimonial...</div>;

  if (!testimonial) return <div className="text-center py-5 text-danger">Testimonial not found.</div>;

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
          <Edit3 size={22} /> Edit Testimonial
        </h3>
        <Link href="/dashboard/testimonials" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-4 shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            className="form-control rounded-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control rounded-3"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter testimonial text"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Logo / Image</label>
          <input type="file" className="form-control rounded-3 mb-2" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-4 mt-2 shadow-sm"
              style={{ width: "100%", maxHeight: "250px", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="text-end small text-muted mb-3">
          <p className="mb-0">
            <strong>Created:</strong>{" "}
            {new Date(testimonial.created_at).toLocaleString("id-ID")}
          </p>
          <p className="mb-0">
            <strong>Last Edited:</strong>{" "}
            {new Date(testimonial.updated_at).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary rounded-3 px-4 d-flex align-items-center gap-1"
            disabled={saving}
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonialPage;
