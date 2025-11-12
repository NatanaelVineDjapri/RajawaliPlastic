"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Camera } from "lucide-react";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import { getBlogsById, updateBlog } from "@/services/blogService";

const MySwal = withReactContent(Swal);

interface Blog {
  id?: string | number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  updated_at?: string;
  created_at?: string;
}

export default function EditBlogPage() {
  const { blogId } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageTitle = "Edit Blog";
  const breadcrumbs = [
    { label: "Blog List", href: "/dashboard/blogs" },
    { label: "Edit Blog" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogsById(blogId as string);
        const data = res.data;

        if (!data) {
          MySwal.fire("Oops...", "Blog not found", "error");
          router.push("/dashboard/blogs");
          return;
        }

        setBlog(data);
        setTitle(data.title);
        setSlug(data.slug);
        setDescription(data.description || "");
        setContent(data.content || "");
        setPreviewImage(data.image || null);
      } catch (err: any) {
        MySwal.fire("Error", err.message || "Failed to fetch blog.", "error");
        router.push("/dashboard/blogs");
      }
    };

    if (blogId) fetchData();
  }, [blogId, router]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blog) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await updateBlog(blog.id!, formData);
      MySwal.fire({
        title: "Success!",
        text: res.message || "Blog updated successfully!",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      router.push("/dashboard/blogs");
    } catch (err: any) {
      MySwal.fire("Error", err.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!blog) return <div className="p-5 text-center">Loading blog...</div>;

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <h5 className="fw-bold mb-4">Blog Details</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control p-3 border rounded-3"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control p-3 border rounded-3"
                  placeholder="Enter slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
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
                  rows={1}
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Content
                </label>
                <textarea
                  className="form-control p-3 border rounded-3"
                  placeholder="Write full content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
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
              <h5 className="fw-bold mb-3">Blog Image</h5>

              <label
                htmlFor="blogImage"
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
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Image Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    unoptimized
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <Camera size={48} style={{ color: "#9ca3af" }} />
                    <span className="small mt-2">
                      Click to upload (Max 2MB)
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  id="blogImage"
                  className="d-none"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/webp"
                  required={!previewImage}
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <SubmitButton
              isLoading={isLoading}
              text="Update Blog"
              loadingText="Updating..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
