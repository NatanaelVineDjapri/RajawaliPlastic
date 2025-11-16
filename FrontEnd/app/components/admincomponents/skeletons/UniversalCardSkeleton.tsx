'use client';

interface Props {
  count?: number;
  imageHeight?: string;
  actions?: number; 
}

export default function UniversalCardSkeleton({
  count = 6,
  imageHeight = "200px",
  actions = 2,    
}: Props) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="col">
          <div className="card h-100 rounded-3 shadow-sm border-0">

            <div
              className="bg-light w-100 rounded-top"
              style={{ height: imageHeight }}
            />

            <div className="card-body">

              {/* Title */}
              <div
                className="bg-light rounded w-75 mb-2"
                style={{ height: "16px" }}
              />

              {/* Subtitle / Description */}
              <div
                className="bg-light rounded w-100 mb-2"
                style={{ height: "12px" }}
              />
              <div
                className="bg-light rounded w-50 mb-3"
                style={{ height: "12px" }}
              />

              <div className="d-flex gap-2 mt-3">
                {Array.from({ length: actions }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-light rounded flex-fill"
                    style={{ height: "32px" }}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
