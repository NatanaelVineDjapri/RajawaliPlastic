'use client';

import React from "react";
import { SkeletonBar } from "./UniversalSkeleton";

export default function RecentlySoldSkeleton() {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <SkeletonBar width="25%" height="16px" />

      <table className="table mt-3">
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td><SkeletonBar width="60%" height="12px" /></td>
              <td><SkeletonBar width="40%" height="12px" /></td>
              <td><SkeletonBar width="50%" height="12px" /></td>
              <td><SkeletonBar width="30%" height="12px" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
