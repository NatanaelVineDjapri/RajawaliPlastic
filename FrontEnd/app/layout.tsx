"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/mobileNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {!isAuthPage && (
          <>
            <Navbar />
            <MobileNavbar />
          </>
        )}

        {children}

        {!isAuthPage}
      </body>
    </html>
  );
}
