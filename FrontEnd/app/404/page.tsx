// app/404/page.tsx
"use client"; // Wajib karena ada onClick

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="position-relative w-100 min-vh-100 d-flex align-items-center justify-content-center overflow-hidden font-sans">
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <Image
          src="/images/Background_Hero.png" 
          alt="Background 404"
          fill
          priority
          className="object-fit-cover" 
          style={{ objectFit: "cover", objectPosition: "center" }} 
          quality={90}
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        ></div>
      </div>

      <div className="container position-relative z-1">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            
            <div 
              className="p-5 text-center shadow-lg rounded-3 border border-white border-opacity-10"
              style={{
                background: "rgba(255, 255, 255, 0.05)", 
                backdropFilter: "blur(15px)", 
                WebkitBackdropFilter: "blur(15px)",
              }}
            >
              
              <div 
                className="position-absolute top-50 start-50 translate-middle rounded-circle"
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: "rgba(13, 110, 253, 0.3)", 
                  filter: "blur(80px)",
                  zIndex: -1
                }}
              ></div>
              <h1 
                className="fw-bolder lh-1 mb-0"
                style={{
                  fontSize: "clamp(6rem, 15vw, 10rem)", 
                  background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.2))", 
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
                }}
              >
                404
              </h1>

              <h2 className="text-white fw-bold mt-n3 mb-3 fs-2">
                Halaman Tidak Ditemukan
              </h2>
              
              <p className="text-white-50 mb-5 fs-5 px-md-5">
                Waduh! Sepertinya kamu tersasar di tumpukan biji plastik. 
                Halaman yang kamu cari tidak ada di sini.
                Yuk kembali ke jalur yang benar dan jelajahi dunia plastik bersama Rajawali Plastic!
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                
                <Link
                  href="/"
                  className="btn btn-primary btn-lg rounded-pill px-5 fw-bold d-flex align-items-center gap-2 shadow"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                  </svg>
                  Kembali ke Home
                </Link>

                <button 
                  onClick={() => router.back()}
                  className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold"
                  style={{ transition: "all 0.3s ease" }}
                >
                  Kembali Sebelumnya
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="text-center text-white-50 mt-4 small">
          Error Code: 404 | Rajawali Plastic System
        </div>

      </div>
    </div>
  );
}