"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getBlogs, deleteBlog } from "@/services/blogService";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Blog {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export default function BlogsPage() {
  const pageTitle = "Blogs";
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blogs" },
  ];

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchBlogs = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setIsLoading(true);
    try {
      const result = await getBlogs();
      // server returns: { message: "...", data: [...] }
      const data = result && Array.isArray(result.data) ? result.data : [];
      setBlogs(data);
    } catch (err: any) {
      console.error("fetchBlogs error", err);
      MySwal.fire("Error", err?.message || "Failed to fetch blogs.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
        deleteBlog(id)
          .then(() => {
            MySwal.fire("Deleted!", "Blog has been deleted.", "success");
            hasFetched.current = false;
            fetchBlogs();
          })
          .catch((error: any) => {
            console.error("deleteBlog error", error);
            MySwal.fire(
              "Failed",
              error.message || "Failed to delete blog.",
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

      {!isLoading && blogs.length === 0 && (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">
            No blogs found. Click the '+' button to add one.
          </p>
        </div>
      )}

      {!isLoading && blogs.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
          {blogs.map((b) => (
            <div key={b.id} className="col">
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
                    src={b.image ?? "/images/logoRS.png"}
                    alt={b.title ?? "blog image"}
                    fill
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 text-start d-flex flex-column">
                  <h5 className="card-title fw-semibold small text-dark mb-2">
                    {b.title}
                  </h5>
                  <h5 className="card-title small text-dark mb-3 fw-normal">
                    {(b.description ?? "").split(" ").slice(0, 12).join(" ") +
                      ((b.description ?? "").split(" ").length > 12
                        ? "..."
                        : "")}
                  </h5>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      href={`/dashboard/blogs/edit/${b.id}`}
                      className="btn btn-sm btn-outline-primary flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(b.id)}
                      className="btn btn-sm btn-outline-danger flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>

                    <Link
                      href={`/blog/${b.slug}`}
                      className="btn btn-sm btn-outline-secondary flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                      target="_blank"
                    >
                      View
                    </Link>
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
