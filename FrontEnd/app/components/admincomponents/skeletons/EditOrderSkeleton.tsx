import React from "react";

interface Props {
  productCount?: number; 
}

export default function EditOrderSkeleton({ productCount = 2 }: Props) {
  return (
    <div className="w-100">
      <div className="mb-4">
        <div
          className="bg-light rounded"
          style={{ width: "250px", height: "32px" }}
        />
        <div
          className="bg-light rounded mt-2"
          style={{ width: "300px", height: "16px" }}
        />
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <div
              className="bg-light rounded mb-4"
              style={{ width: "150px", height: "24px" }}
            />
            <div className="mb-3">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "100px", height: "14px" }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "100%", height: "50px" }} // p-3 input
              />
            </div>
            <div className="mb-3">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "130px", height: "14px" }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "100%", height: "38px" }} // form-select
              />
            </div>
            <div className="mb-3">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "120px", height: "14px" }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "100%", height: "38px" }} // form-select
              />
            </div>
            <div className="mb-3">
              <div
                className="bg-light rounded mb-2"
                style={{ width: "80px", height: "14px" }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "100%", height: "50px" }} // textarea p-3
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow p-4">
            <div
              className="bg-light rounded mb-3"
              style={{ width: "180px", height: "24px" }}
            />
            {Array.from({ length: productCount }).map((_, index) => (
              <div className="border rounded-3 p-3 mb-3" key={index}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-5">
                    <div
                      className="bg-light rounded mb-2"
                      style={{ width: "80px", height: "14px" }}
                    />
                    <div
                      className="bg-light rounded"
                      style={{ width: "100%", height: "38px" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <div
                      className="bg-light rounded mb-2"
                      style={{ width: "90px", height: "14px" }}
                    />
                    <div
                      className="bg-light rounded" 
                      style={{ width: "100%", height: "38px" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <div
                      className="bg-light rounded mb-2"
                      style={{ width: "70px", height: "14px" }}
                    />
                    <div
                      className="bg-light rounded"
                      style={{ width: "100%", height: "38px" }}
                    />
                  </div>
                  <div className="col-md-1 d-flex align-items-end">
                    <div
                      className="bg-light rounded"
                      style={{ width: "100%", height: "38px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div
              className="bg-light rounded mb-3"
              style={{ width: "100%", height: "38px" }}
            />
            <div className="border-top pt-3 mt-2 d-flex justify-content-end">
              <div
                className="bg-light rounded"
                style={{ width: "200px", height: "20px" }}
              />
            </div>
            <div className="mt-4">
              <div
                className="bg-light rounded"
                style={{ width: "100%", height: "48px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}