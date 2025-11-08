"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getProducts, deleteProduct } from "@/services/productService";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Product {
  id: string;
  name: string;
  image_url: string;
  description?: string;
  quantity?: number;
}

export default function ProductsPage() {
  const pageTitle = "Products";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products" },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const result = await getProducts();
      if (result.data && Array.isArray(result.data)) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Failed to fetch products.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
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
        deleteProduct(id)
          .then(() => {
            MySwal.fire("Deleted!", "Product has been deleted.", "success");
            fetchProducts();
          })
          .catch((error) => {
            MySwal.fire("Failed", error.message, "error");
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

      {!isLoading && products.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">
            No products found. Click the '+' button to add one.
          </p>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
          {products.map((item) => (
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
                    src={item.image_url}
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
                    {(item.description ?? "")
                      .split(" ")
                      .slice(0, 10)
                      .join(" ") +
                      ((item.description ?? "").split(" ").length > 10
                        ? "..."
                        : "")}
                  </h5>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      href={`/dashboard/products/edit/${item.id}`}
                      className="btn btn-sm btn-outline-primary px-3 rounded-3 d-flex align-items-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-outline-danger px-3 rounded-3 d-flex align-items-center gap-1"
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
