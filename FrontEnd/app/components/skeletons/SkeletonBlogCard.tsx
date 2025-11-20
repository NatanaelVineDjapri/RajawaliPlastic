'use client';
import React from "react";
import { Row, Col, Card, Placeholder } from "react-bootstrap";

const SkeletonBlogCard: React.FC = () => {
  return (
    <Row className="justify-content-center g-4 mb-5">
      {[1, 2, 3].map((i) => (
        <Col key={i} xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-lg border-0">
            <div className="position-relative" style={{ height: "250px" }}>
              <Placeholder
                animation="wave"
                style={{ height: "100%", width: "100%", borderRadius: "6px" }}
                className="bg-secondary"
              />
            </div>

            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={8} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={10} />
              </Placeholder>

              <Placeholder.Button
                variant="dark"
                xs={4}
                className="rounded-pill mt-3"
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonBlogCard;
