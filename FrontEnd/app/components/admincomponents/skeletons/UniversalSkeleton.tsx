'use client';
import React from "react";

export const SkeletonBar = ({
  width = "100%",
  height = "14px",
}: {
  width?: string | number;
  height?: string | number;
}) => (
  <div
    className="bg-light rounded"
    style={{ width, height, opacity: 0.7 }}
  />
);

export const SkeletonCircle = ({
  size = "40px",
}: {
  size?: string | number;
}) => (
  <div
    className="bg-light rounded-circle"
    style={{ width: size, height: size, opacity: 0.7 }}
  />
);

export const SkeletonBox = ({
  width = "100%",
  height = "100px",
}: {
  width?: string | number;
  height?: string | number;
}) => (
  <div
    className="bg-light rounded"
    style={{ width, height, opacity: 0.7 }}
  />
);
