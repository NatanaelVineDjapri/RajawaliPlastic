'use client';
import React from "react";
import { Row, Col, Placeholder } from "react-bootstrap";

const SkeletonGallery: React.FC = () => {
  return (
    <Row className="g-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Col
          key={i}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <div
            className="position-relative"
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
           <Placeholder
  as="div"
  animation="wave"
  className="placeholder bg-secondary"
  style={{
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  }}
/>

          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonGallery;
