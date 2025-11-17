'use client';

import React from 'react';
import { SkeletonBar } from './UniversalSkeleton';

export default function StatsGridSkeleton() {
  return (
    <div className="row g-3">
      {[1, 2, 3].map((i) => (
        <div className="col-12 col-md-4 mb-4" key={i}>
          <div className="bg-white p-3 rounded-3 shadow-sm h-100">
            <SkeletonBar width="40%" height="50px" />
            <div className="mt-3">
              <SkeletonBar width="70%" height="26px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
