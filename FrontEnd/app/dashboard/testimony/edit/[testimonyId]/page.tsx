"use client";

// Importnya digabung dari Edit dan Create
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation"; // Penting untuk Edit
import { Camera, Save } from "lucide-react"; // Kita pakai Save untuk tombolnya
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/TempButton";
import {
  getTestimonialById, // Penting untuk Edit
  updateTestimonial, // Penting untuk Edit
} from "@/services/testimonialService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

// Interface-nya kita samain aja
interface Testimonial {
  _id: string;
  name: string;
  logo: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function EditTestimonyPage() {
  // Ini jadi halaman Edit
  const { testimonyId } = useParams(); // Ambil ID dari URL
  const router = useRouter();

  const pageTitle = "Edit Testimony"; // Ganti judul

  // State dari halaman Create
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  // State loading dari halaman Edit
  const [isLoading, setIsLoading] = useState(false); // Untuk tombol submit
  const [pageLoading, setPageLoading] = useState(true); // Untuk loading data awal

  const breadcrumbs = [
    { label: "Testimony List", href: "/dashboard/testimony" },
    { label: "Edit Testimony" }, // Ganti label
  ];

  // --- INI LOGIKA PENTING YANG LU MINTA ---
  // Ambil data pas halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      if (!testimonyId) {
        MySwal.fire("Error", "Testimonial ID not found.", "error");
        router.push("/dashboard/testimony");
        return;
      }

      try {
        setPageLoading(true);
        const response = await getTestimonialById(testimonyId as string);
        const data = response.data;

        // Set state pakai data yang di-fetch
        setName(data.name);
        setDescription(data.description);
        setPreviewLogo(data.logo); // Ini adalah URL logo yang lama (dari DB)
      } catch (err: any) {
        MySwal.fire(
          "Error",
          err.message || "Failed to fetch testimonial.",
          "error"
        );
        router.push("/dashboard/testimony");
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [testimonyId, router]);

  // Handler ganti logo, sama kayak Create
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file); // Ini file baru
      // Ganti preview-nya jadi file baru
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // Handler submit, ini pakai logika UPDATE
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Loading tombol submit

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // PENTING: Cuma kirim 'logo' kalau user UDAH milih file baru
    if (logo) {
      formData.append("logo", logo);
    }
    // Note: Backend Laravel/PHP mungkin butuh ini untuk `update` pakai FormData
    // formData.append("_method", "PATCH");

    try {
      // Panggil service UPDATE, bukan 'add'
      const result = await updateTestimonial(testimonyId as string, formData);
      MySwal.fire({
        title: "Success!",
        text: result.message || "Testimonial updated successfully.",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });

      // Redirect balik ke list
      router.push("/dashboard/testimony");
    } catch (error) {
      let msg = "An unknown error occurred.";
      if (error instanceof Error) msg = error.message;
      MySwal.fire({
        title: "Oops...",
        text: msg,
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Kasih loading spinner pas datanya diambil
  if (pageLoading) {
    return (
      <div className="w-100 text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // --- INI JSX (DESAIN) DARI 'CreateTestimonyPage' ---
  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-4">Testimony Details</h5>

              <div className="d-flex flex-column gap-3">
                <div>
                  <label
                    htmlFor="clientName"
                    className="form-label fw-semibold text-secondary small mb-1"
                  >
                    Client Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    className="form-control p-3 border rounded-3"
                    placeholder="Enter client or company name"
                    value={name} // <-- LOGIKA-nya masuk di sini
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="form-label fw-semibold text-secondary small mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control p-3 border rounded-3"
                    placeholder="Enter testimony description..."
                    rows={9}
                    style={{ minHeight: "150px", resize: "vertical" }}
                    value={description} // <-- LOGIKA-nya masuk di sini
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4 h-60">
              <h5 className="fw-bold mb-4">Client Logo</h5>

              <label
                className="d-flex flex-column align-items-center justify-content-center p-4 text-muted rounded-3 border-2 border-dashed bg-light w-100 position-relative"
                style={{
                  minHeight: "320px",
                  borderColor: "#d1d5db",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {/* LOGIKA-nya masuk di sini */}
                {previewLogo ? (
                  <Image
                    src={previewLogo} // <-- Tampilkan data lama/baru
                    alt="Logo Preview"
                    fill
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                      padding: "20px",
                    }}
                  />
                ) : (
                  <>
                    <Camera size={48} style={{ color: "#9ca3af" }} />
                    <span className="small mt-2">
                      Click to upload (Max 2MB, 16:9)
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="d-none"
                  onChange={handleLogoChange}
                  accept="image/png, image/jpeg, image/webp"
                  // 'required' DIHAPUS, karena edit boleh nggak ganti gambar
                />
              </label>
            </div>

            <div className="d-grid">
              <SubmitButton
                isLoading={isLoading}
                text="Save Changes" // Ganti teks tombol
                loadingText="Saving..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
