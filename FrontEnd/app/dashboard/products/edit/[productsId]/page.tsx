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
  getProductById,
  getLastEditedProducts,
  updateProduct,
} from "@/services/productService";

const MySwal = withReactContent(Swal);

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  description: string;
  image_url?: string;
  updated_at?: string;
  total_update?: number;
  price?: number;
  quantity?: number;
}

export default function EditProductPage() {
  const { productsId } = useParams(); 
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  const pageTitle = "Edit Product";
  const breadcrumbs = [
    { label: "Product List", href: "/dashboard/products" },
    { label: "Edit Product" },
  ];

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRes = await getProductById(productsId as string);
        const target = productRes.data;

        if (!target) {
          MySwal.fire("Oops...", "Product not found", "error");
          router.push("/dashboard/products");
          return;
        }

        setProduct(target);
        setProductName(target.name);
        setDescription(target.description || "");
        setPreviewImage(target.image_url || null);

        const lastEditedRes = await getLastEditedProducts();
        setRecentProducts(lastEditedRes.data || []);
      } catch (err: any) {
        MySwal.fire(
          "Error",
          err.message || "Failed to load product data",
          "error"
        );
        router.push("/dashboard/products");
      }
    };
    if (productsId) fetchProductData();
  }, [productsId, router]); 

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await updateProduct(product._id || product.id!, formData);
      MySwal.fire({
        title: "Success!",
        text: res.message || "Product updated successfully!",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      router.push("/dashboard/products");
    } catch (err: any) {
      MySwal.fire("Error", err.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product)
    return <div className="p-5 text-center">Loading product...</div>;

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <h5 className="fw-bold mb-4">Product Details</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <label className="form-label fw-semibold small text-secondary">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control p-3 border rounded-3"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
              <h5 className="fw-bold mb-3">Product Image</h5>

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
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Slider Preview"
                    fill
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    unoptimized
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <Camera size={48} style={{ color: "#9ca3af" }} />
                    <span className="small mt-2">
                      Click to upload (Max 2MB, 16:9)
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  id="sliderImage"
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
              text="Update Product"
              loadingText="Updating..."

            />
          </div>
        </div>
      </form>

      <div className="mt-5 bg-white rounded-3 shadow-sm p-4">
        <h5 className="fw-bold mb-3">Recently Edited Products</h5>
        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Total Updates</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.length > 0 ? (
                recentProducts.map((p) => (
                  <tr key={p._id || p.id}>
                    <td style={{ width: "80px" }}>
                      {p.image_url ? (
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          width={60}
                          height={60}
                          className="rounded-2"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      ) : (
                        <div className="bg-light text-center text-muted rounded-2 p-2 small">
                          No Image
                        </div>
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>
                      {p.description
                        ? p.description.split(" ").slice(0, 8).join(" ") + "..."
                        : "-"}
                    </td>
                    <td>{p.total_update ?? 0}</td>
                    <td>
                      {p.updated_at
                        ? new Date(p.updated_at).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-3">
                    No recent updates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}