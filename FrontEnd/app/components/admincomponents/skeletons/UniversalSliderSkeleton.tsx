import React from "react";

interface Props {
  count?: number; 
}

export default function UniversalSliderSkeleton({ count = 4 }: Props) {
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5 d-flex flex-column">
        <div
          className="bg-white rounded-3 shadow-sm p-3 p-md-4 d-flex flex-column"
          style={{ minHeight: "50vh" }}
        >
          <div className="mb-3">
            <div 
              className="bg-light rounded"
              style={{ width: "50%", height: "1.2rem" }}
            />
          </div>
          <div
            className="w-100 rounded-3 flex-grow-1 d-flex flex-column align-items-center justify-content-center p-3 p-md-4 border-2 border-dashed"
            style={{
              minHeight: "320px",
              backgroundColor: "#f9fafb", 
            }}
          >
            <div 
              className="bg-light rounded-circle" 
              style={{ width: 48, height: 48 }}
            ></div>
            <div 
              className="bg-light rounded mt-2"
              style={{ width: "60%", height: "1rem" }} 
            ></div>
          </div>
        </div>
        <div className="bg-white rounded-3 shadow-sm p-3 mt-3">
          <div
            className="bg-light rounded"
            style={{ width: "100%", height: "15px" }}
          />
        </div>
      </div>
      <div className="col-12 col-lg-7">
        <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 h-100">
          <div className="mb-4">
            <div 
              className="bg-light rounded"
              style={{ width: "50%", height: "1.2rem" }} 
            />
          </div>
          <div className="list-group">
            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 gap-md-3 p-2 p-md-3"
                >
                  <div className="d-flex align-items-center gap-2 gap-md-3">

                    <div
                      className="bg-light rounded" 
                      style={{
                        width: "100px",
                        height: "60px",
                      }}
                    ></div>
                    <div className="w-100">
                      <div // <-- DIUBAH
                        className="bg-light rounded"
                        style={{ width: "70%", height: "1rem" }} // disamain kayak col-8
                      />
                    </div>
                  </div>
                  <div className="mt-2 mt-md-0">
                    <div 
                      className="bg-light rounded"
                      style={{
                        width: "80px",
                        height: "31px",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
