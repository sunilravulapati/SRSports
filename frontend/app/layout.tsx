import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; // Import Oswald
import "./globals.css";

// 1. Configure the fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "SR Sports",
  description: "Premium Cricket Goods & Coaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Add the variables to the body class */}
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}