// src/app/layout.tsx

'use client';  // Add this line to mark the file as a client component

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from 'react';
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
