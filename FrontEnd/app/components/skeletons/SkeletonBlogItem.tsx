"use client";
import React from "react";
import { Placeholder } from "react-bootstrap";

const SkeletonBlogContent = () => {
  return (
    <section className="content-blog-section py-5">
      <div className="container text-white" style={{ maxWidth: "720px" }}>

        <div className="text-center mb-2">
          <Placeholder
            animation="wave"
            className="bg-secondary d-block mx-auto"
            style={{ width: "80%", height: "102px", borderRadius: "6px" }}
          />
        </div>

        <div className="text-center mb-4">
          <Placeholder
            animation="wave"
            className="bg-secondary d-block mx-auto"
            style={{ width: "35%", height: "14px", borderRadius: "3px" }}
          />
        </div>

        <div className="mt-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <Placeholder
              key={i}
              animation="wave"
              className="bg-secondary d-block mb-2"
              style={{
                width: i === 5 ? "100%" : "100%",
                height: "14px",
                borderRadius: "3px",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkeletonBlogContent;
