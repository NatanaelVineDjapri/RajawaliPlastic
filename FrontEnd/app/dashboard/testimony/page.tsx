"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import {
  getTestimonials,
  deleteTestimonial,
} from "@/services/testimonialService";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Testimonial {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export default function TestimonyPage() {
  const pageTitle = "Testimony";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Testimony" },
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTestimonials() {
    setIsLoading(true);
    try {
      const result = await getTestimonials();
      if (result.data && Array.isArray(result.data)) {
        setTestimonials(result.data);
      }
    } catch (error: any) {
      console.error(error);
      MySwal.fire(
        "Error",
        error.message || "Failed to fetch testimonials.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

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
        deleteTestimonial(id)
          .then(() => {
            MySwal.fire("Deleted!", "Testimonial has been deleted.", "success");
            fetchTestimonials();
          })
          .catch((error: any) => {
            MySwal.fire(
              "Failed",
              error.message || "Failed to delete testimonial.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="w-100 position-relative">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

      {isLoading && (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!isLoading && testimonials.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">
            No testimonials found. Click the '+' button to add one.
          </p>
        </div>
      )}

      {!isLoading && testimonials.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
          {testimonials.map((item) => (
            <div key={item.id} className="col">
              <div
                className="card h-100 overflow-hidden rounded-3 shadow-sm border-0"
                style={{ backgroundColor: "#ffffff", borderColor: "#dee2e6" }}
              >
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 text-start d-flex flex-column">
                  <h5 className="card-title fw-semibold small text-dark mb-2">
                    {item.name}
                  </h5>
                  <h5 className="card-title small text-dark mb-3 fw-normal">
                    {item.description}
                  </h5>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      href={`/dashboard/testimony/edit/${item.id}`}
                      className="btn btn-sm btn-outline-primary flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-outline-danger flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
