"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  MessageSquareText,
  Users,
  MessageCircle,
  UserCog,
  FileText,
  GalleryVertical,
  Layers,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

import { logout } from "@/services/authService";

const MySwal = withReactContent(Swal);

const mainNavLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Boxes },
  { href: "/dashboard/orders", label: "Order Lists", icon: ClipboardList },
];

const pageNavLinks = [
  { href: "/dashboard/testimony", label: "Testimony", icon: MessageSquareText },
  { href: "/dashboard/partners", label: "Partners", icon: Users },
  { href: "/dashboard/chat", label: "Chat", icon: MessageCircle },
  { href: "/dashboard/users", label: "User Settings", icon: UserCog },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/gallery", label: "Web gallery", icon: GalleryVertical },
  { href: "/dashboard/hero", label: "Hero", icon: Layers },
];

interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidenavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: "Logout?",
      text: "Are you sure want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (result.isConfirmed) {
      try {
        await logout();
        localStorage.removeItem("token");

        await MySwal.fire({
          icon: "success",
          title: "Logged out",
          text: "Anda berhasil keluar.",
          timer: 1400,
          showConfirmButton: false,
        });

        window.location.href = "/auth/login";
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Gagal Logout",
          text: "Terjadi kesalahan, coba lagi.",
        });
      }
    }
  };

  const renderLink = (link: NavLinkProps) => {
    const { href, label, icon: Icon } = link;
    const isDashboardRoot = href === "/dashboard";
    const isExactMatch = pathname === href;
    const isSubPage = pathname.startsWith(href + "/");

    const isActive = isExactMatch || (!isDashboardRoot && isSubPage);

    return (
      <Link
        key={href}
        href={href}
        className={`nav-link d-flex align-items-center gap-2 rounded-3 py-2 px-3 ${
          isActive ? "active fw-semibold" : "text-dark"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  return (
    <>
      <button
        className="hamburger-btn d-lg-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <aside
        className={`d-flex flex-column bg-white border-end position-fixed top-0 h-100 transition-all ${
          isOpen ? "start-0" : "start-n100"
        } d-lg-flex`}
        style={{
          width: "14rem",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="flex-grow-1 overflow-hidden">
          <nav className="nav nav-pills flex-column p-3 pt-1 mt-1 gap-1">
            {mainNavLinks.map(renderLink)}
          </nav>

          <div className="px-3 pt-3 pb-1">
            <span className="small fw-semibold text-muted text-uppercase">
              Pages
            </span>
          </div>

          <nav className="nav nav-pills flex-column px-3 pt-1 pb-3 gap-1">
            {pageNavLinks.map(renderLink)}
          </nav>

          <div className="border-top mt-2 p-3">
            <nav className="nav nav-pills flex-column gap-1">
              <Link
                href="/dashboard/adminsettings"
                className={`nav-link d-flex align-items-center gap-2 rounded-3 py-2 px-3 ${
                  pathname === "/dashboard/adminsettings" ||
                  pathname.startsWith("/dashboard/adminsettings" + "/")
                    ? "active fw-semibold"
                    : "text-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <UserCog size={16} />
                Admin Settings
              </Link>

              <div
                role="button"
                className="nav-link text-danger d-flex align-items-center gap-2 rounded-3 py-2 px-3"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                <LogOut size={16} />
                Logout
              </div>
            </nav>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .hamburger-btn {
          position: fixed;
          bottom: 30px;
          left: 20px;
          z-index: 2000;
          background: white;
          border: none;
          width: 58px;
          height: 58px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease;
        }

        .hamburger-btn:active {
          transform: scale(0.95);
        }

        @media (min-width: 992px) {
          .hamburger-btn {
            display: none !important;
          }
          aside {
            position: static !important;
            transform: none !important;
            width: 14rem !important;
          }
        }

        @media (max-width: 991px) {
          aside {
            width: 75% !important;
            max-width: 260px;
            background: white;
          }
        }
      `}</style>
    </>
  );
}
