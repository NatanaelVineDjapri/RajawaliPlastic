"use client";

interface UniversalFormSkeletonProps {
  leftFields?: number;
  rightBoxes?: number;
  textareaHeight?: number; 
}

export default function UniversalFormSkeleton({
  leftFields = 4,
  rightBoxes = 1,
  textareaHeight = 180,
}: UniversalFormSkeletonProps) {
  return (
    <div className="w-100 row g-4">

      {/* LEFT SIDE */}
      <div className="col-lg-8">
        <div className="bg-white rounded-3 shadow-sm p-4" style={{height: "65vh" }} >

          {/* Title */}
          <div className="bg-light rounded mb-4" style={{ width: "180px", height: "24px" }} />

          <div className="d-flex flex-column gap-4">
            {Array.from({ length: leftFields }).map((_, i) => (
              <div key={i}>
                <div className="bg-light rounded mb-2" style={{ width: "150px", height: "14px" }} />
                <div className="bg-light rounded" style={{ width: "100%", height: "48px" }} />
              </div>
            ))}
          </div>

          {/* TEXTAREA */}
          <div className="mt-4">
            <div className="bg-light rounded mb-2" style={{ width: "120px", height: "14px" }} />
            <div className="bg-light rounded" style={{ width: "100%", height: `${textareaHeight}px` }} />
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-lg-4 d-flex flex-column gap-4">

        {/* IMAGE BOX */}
        <div className="bg-white rounded-3 shadow-sm p-4" style={{ minHeight: "400px" }}>
          <div className="bg-light rounded mb-3" style={{ width: "150px", height: "14px" }} />
          <div className="bg-light rounded" style={{ width: "100%", height: "310px" }} />
        </div>

        {/* BUTTON */}
        <div className="bg-white rounded-3 shadow-sm p-3">
          <div className="bg-light rounded" style={{ width: "100%", height: "15px" }} />
        </div>

      </div>
    </div>
  );
}
