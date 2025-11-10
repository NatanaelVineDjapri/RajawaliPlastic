"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getSliders, deleteSlider } from "@/services/heroService"; // pastikan service ini ada
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface HeroItem {
  id: string;
  image: string;
  label?: string;
}

export default function HeroPage() {
  const pageTitle = "Hero";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Hero" },
  ];

  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHero = async () => {
    setIsLoading(true);
    try {
      const result = await getSliders();
      if (result.data && Array.isArray(result.data)) {
        setHeroItems(result.data);
      }
    } catch (error: any) {
      console.error(error);
      MySwal.fire(
        "Error",
        error.message || "Failed to fetch hero items.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleRemove = (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#007bff",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlider(id)
          .then(() => {
            MySwal.fire("Removed!", "Hero slider has been removed.", "success");
            fetchHero();
          })
          .catch((error: any) => {
            MySwal.fire(
              "Failed",
              error.message || "Failed to remove hero item.",
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

      {!isLoading && heroItems.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">No hero sliders found.</p>
        </div>
      )}

      {!isLoading && heroItems.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pb-5 mt-2">
          {heroItems.map((item) => (
            <div key={item.id} className="col">
              <div
                className="card h-100 overflow-hidden rounded-3 shadow-sm border-0"
                style={{ backgroundColor: "#ffffff", borderColor: "#dee2e6" }}
              >
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ minHeight: "180px", position: "relative" }}
                >
                  <Image
                    src={item.image}
                    alt={item.label || `Hero item ${item.id}`}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 d-flex flex-column">
                  {item.label && (
                    <p className="card-text fw-semibold text-dark mb-2 text-center">
                      {item.label}
                    </p>
                  )}

                  <div className="mt-auto d-flex gap-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-sm btn-outline-danger w-100 rounded-3 d-flex align-items-center justify-content-center gap-1"
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