"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getGalleries, deleteGallery } from "@/services/galleryService";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_base64: string;
}

export default function GalleryPage() {
  const pageTitle = "Web Gallery";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Gallery" },
  ];

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const result = await getGalleries();

      if (Array.isArray(result.data)) {
        setGalleryItems(result.data);
      } else if (Array.isArray(result.data.data)) {
        setGalleryItems(result.data.data);
      } else {
        console.error("Struktur data tidak diharapkan:", result);
      }
    } catch (error: any) {
      console.error(error);
      MySwal.fire(
        "Error",
        error.message || "Failed to fetch gallery items.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
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
        deleteGallery(id)
          .then(() => {
            MySwal.fire(
              "Removed!",
              "Gallery item has been removed.",
              "success"
            );
            fetchGallery();
          })
          .catch((error: any) => {
            MySwal.fire(
              "Failed",
              error.message || "Failed to remove gallery item.",
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

      {!isLoading && galleryItems.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">No gallery items found.</p>
        </div>
      )}

      {!isLoading && galleryItems.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
          {galleryItems.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 overflow-hidden rounded-3 shadow-sm border-0">
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ minHeight: "180px", position: "relative" }}
                >
                  <Image
                    src={`data:image/webp;base64,${item.image_base64}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 d-flex flex-column">
                  <p className="fw-semibold text-dark mb-2 ">{item.title}</p>
                  <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {item.description}
                  </p>

                  <div className="mt-auto">
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
