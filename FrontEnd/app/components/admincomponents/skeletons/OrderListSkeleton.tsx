"use client";

export default function OrderListSkeleton({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card mb-3 shadow-sm border-0">
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="bg-light rounded me-3"
                  style={{ width: "30px", height: "30px" }}
                />
                <div>
                  <div
                    className="bg-light rounded mb-2"
                    style={{ width: "140px", height: "14px" }}
                  />
                  <div
                    className="bg-light rounded"
                    style={{ width: "200px", height: "12px" }}
                  />
                </div>
              </div>
              <div className="text-end d-none d-sm-block">
                <div
                  className="bg-light rounded mb-2"
                  style={{ width: "100px", height: "12px" }}
                />
                <div
                  className="bg-light rounded"
                  style={{ width: "120px", height: "14px" }}
                />
              </div>
            </div>

            {/* Status Badges */}
            {/* <div className="mt-3 d-flex gap-2">
              <div
                className="bg-light rounded"
                style={{ width: "80px", height: "22px" }}
              />
              <div
                className="bg-light rounded"
                style={{ width: "80px", height: "22px" }}
              />
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
}
