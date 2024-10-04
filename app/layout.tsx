"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import ViewedStoriesService from "./services/batchingService";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const viewedStoriesService = new ViewedStoriesService();
  }, []);

  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
      >
        {children}
      </body>
    </html>
  );
}
