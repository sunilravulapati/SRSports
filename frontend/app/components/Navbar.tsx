"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center md:justify-start">
        {/* Centered Logo on Mobile, Left on Desktop */}
        <Link href="/" className="text-3xl font-black text-gray-900 tracking-tighter hover:text-green-600 transition-colors">
          SR SPORTS
        </Link>
      </div>
    </header>
  );
}