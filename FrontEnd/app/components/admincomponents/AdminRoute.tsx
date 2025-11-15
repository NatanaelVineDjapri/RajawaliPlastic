"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false); 

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    setIsVerified(true);

  }, [router]);

  if (!isVerified) {
    return null; 
  }

  return <>{children}</>;
}