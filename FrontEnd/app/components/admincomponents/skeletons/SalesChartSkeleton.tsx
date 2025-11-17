'use client';

import React from "react";
import { SkeletonBar, SkeletonBox } from "./UniversalSkeleton";

export default function SalesChartSkeleton() {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <SkeletonBar width="30%" height="18px" />
      <div className="mt-3">
        <SkeletonBox width="100%" height="250px" />
      </div>
    </div>
  );
}
