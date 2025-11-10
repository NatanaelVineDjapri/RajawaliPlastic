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
  image: string;
  label?: string;
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
      if (result.data && Array.isArray(result.data)) {
        setGalleryItems(result.data);
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

  const handleRemove = (idToRemove: number) => {
    setGalleryItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="w-100 px-2 px-md-4">
      <h1 className="fs-3 fw-bold text-dark mb-4 text-center text-md-start">{pageTitle}</h1>

      <div className="rounded-3 p-3 p-md-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold text-center text-md-start" style={{ color: '#005F6B' }}>
          Gallery
        </h2>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4 pb-5">
        {galleryItems.map((item) => (
          <div key={item.id} className="col d-flex">
            <div
              className="card flex-fill h-100 overflow-hidden rounded-3 shadow-sm text-center border"
              style={{ backgroundColor: '#f9fafb', borderColor: '#dee2e6' }}
            >
              <div className="bg-white p-3 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                <Image
                  src={item.img}
                  alt={`Gallery item ${item.id}`}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="card-body p-3">
                <button
                  className="btn btn-sm w-100 rounded-3 fw-medium"
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: '#e0e0ff',
                    color: '#6c63ff',
                    borderColor: '#c0bfff',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`Gallery item ${item.id}`}
                    fill
                    style={{ objectFit: "cover"}}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 d-flex flex-column">
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