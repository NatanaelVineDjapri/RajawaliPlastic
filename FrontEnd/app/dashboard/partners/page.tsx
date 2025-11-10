"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getPartners, deletePartner } from "@/services/partnerService";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Partner {
  id: string;
  name: string;
  logo: string;
  link: string;
}

export default function PartnersPage() {
  const pageTitle = "Partners";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Partners" },
  ];

  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const result = await getPartners();
      if (result.data && Array.isArray(result.data)) {
        setPartners(result.data);
      }
    } catch (error: any) {
      console.error(error);
      MySwal.fire(
        "Error",
        error.message || "Failed to fetch partners.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
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
        deletePartner(id)
          .then(() => {
            MySwal.fire("Deleted!", "Partner has been deleted.", "success");
            fetchPartners();
          })
          .catch((error: any) => {
            MySwal.fire(
              "Failed",
              error.message || "Failed to delete partner.",
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

      {!isLoading && partners.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">
            No partners found. Click the '+' button to add one.
          </p>
        </div>
      )}

      {!isLoading && partners.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
          {partners.map((partner) => (
            <div key={partner.id} className="col">
              <div
                className="card h-100 overflow-hidden rounded-3 shadow-sm border-0"
                style={{ backgroundColor: "#ffffff", borderColor: "#dee2e6" }}
              >
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 text-start d-flex flex-column">
                  <h5 className="card-title fw-semibold small text-dark mb-2">
                    {partner.name}
                  </h5>
                  <h5 className="card-title fw-semibold small text-dark mb-3">
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-none"
                    >
                      {partner.link}
                    </a>
                  </h5>

                  <div className="mt-auto d-flex">
                    <button
                      onClick={() => handleDelete(partner.id)}
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
