"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Custom500() {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="position-relative w-100 min-vh-100 d-flex align-items-center justify-content-center overflow-hidden font-sans">
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <Image
          src="/images/Background_Hero.png" 
          alt="Background Error"
          fill
          priority
          className="object-fit-cover" 
          style={{ objectFit: "cover", objectPosition: "center" }} 
          quality={90}
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} 
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
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(220, 53, 69, 0.2)", 
                  filter: "blur(100px)",
                  zIndex: -1
                }}
              ></div>

              <h1 
                className="fw-bolder lh-1 mb-0"
                style={{
                  fontSize: "clamp(6rem, 15vw, 10rem)", 
                  background: "linear-gradient(to bottom, #ffffff, rgba(255,200,200,0.2))", 
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
                }}
              >
                500
              </h1>

              <h2 className="text-white fw-bold mt-n3 mb-3 fs-2">
                Terjadi Kesalahan Server
              </h2>
              
              <p className="text-white-50 mb-5 fs-5 px-md-5">
                Oops! Mesin kami sepertinya mengalami gangguan teknis atau <i>overheat</i>. 
                Tim kami sedang berusaha memperbaikinya agar produksi kembali lancar.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                
                <button 
                  onClick={handleRefresh}
                  className="btn btn-primary btn-lg rounded-pill px-5 fw-bold d-flex align-items-center gap-2 shadow"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  Coba Muat Ulang
                </button>

                <Link
                  href="/"
                  className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold"
                  style={{ transition: "all 0.3s ease" }}
                >
                  Kembali ke Home
                </Link>

              </div>

            </div>
          </div>
        </div>

        <div className="text-center text-white-50 mt-4 small">
          Error Code: 500 | Rajawali Plastic System
        </div>

      </div>
    </div>
  );
}