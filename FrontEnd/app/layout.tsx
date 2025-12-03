"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/mobileNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import EchoProvider from "./providers/echoProvider";

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
  const isAdminPage = pathname.startsWith("/dashboard");
  const isSystemPage = pathname === "/404" || pathname === "/not-found" ||pathname === "/500" || pathname === "/error";
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {!isAuthPage && !isAdminPage &&  !isSystemPage &&(
          <>
            <Navbar />
            <MobileNavbar />
          </>
        )}
        <EchoProvider>
          {children}
        </EchoProvider>
      </body>
    </html>
  );
}
