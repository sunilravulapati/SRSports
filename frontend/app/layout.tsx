import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";  // 👈 THIS IS MISSING! ADD THIS LINE.
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SR Sports",
  description: "Premium Cricket Gear & Coaching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}