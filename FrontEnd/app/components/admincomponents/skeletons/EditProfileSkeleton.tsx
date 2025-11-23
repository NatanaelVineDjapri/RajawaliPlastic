import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditProfileSkeleton() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/Background_Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-4"
        style={{
          background: "linear-gradient(180deg, #1e3a5f, #0b1e30)",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          width: "480px", 
        }}
      >
        <div
          className="p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            width: "100%",
            boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="bg-light rounded mb-4 mx-auto"
            style={{ width: "150px", height: "28px" }}
          />
          <div className="row">
            <div className="col-12 col-md-6">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "100px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3"
                style={{ width: "100%", height: "38px" }}
              />
              <div
                className="bg-light rounded mb-2"
                style={{ width: "80px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3"
                style={{ width: "100%", height: "38px" }}
              />
              <div
                className="bg-light rounded mb-2"
                style={{ width: "90px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3" // mb-3 terakhir
                style={{ width: "100%", height: "38px" }}
              />
            </div>
            <div className="col-12 col-md-6">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "120px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3"
                style={{ width: "100%", height: "38px" }}
              />
              <div
                className="bg-light rounded mb-2"
                style={{ width: "110px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3"
                style={{ width: "100%", height: "38px" }}
              />
              <div
                className="bg-light rounded mb-2"
                style={{ width: "130px", height: "14px" }}
              />
              <div
                className="bg-light rounded mb-3" 
                style={{ width: "100%", height: "38px" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <div
              className="bg-light"
              style={{
                width: "120px", 
                height: "42px", 
                borderRadius: "25px", 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}