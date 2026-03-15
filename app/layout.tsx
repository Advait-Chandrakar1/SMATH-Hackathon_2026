import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavProfile from "@/components/NavBar";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReefGuard",
  description: "NCSSM Hackathon Project Theme - Under the Sea",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          Providers wraps everything so Firebase auth state is available
          anywhere in the tree — NavProfile and SaveButton both depend on it.
        */}

        {/* NavProfile sits fixed top-right above all page content */}
        <div className="fixed right-5 top-4 z-50">
          <NavProfile />
        </div>
        {children}
      </body>
    </html>
  );
}
