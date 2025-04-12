"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Adjusted width to be 95% of the viewport and maximum width of 1400px for larger screens
    <nav className="sticky top-7 z-50 w-[95%] max-w-[1450px] mx-auto bg-white rounded-[3vh] p-4 shadow-[0_0_15px_rgba(0,0,0,0.15)] flex items-center justify-between text-blue">
      {/* Logo on the left */}
      <div className="pl-4">
        <Image src="/logo.jpg" alt="Logo" width={150} height={60} priority />
      </div>

      {/* Navigation links for medium+ screens */}
      <div className="hidden md:flex items-center pr-4 gap-11 text-black text-xl font-large">
        <Link
          href="/"
          className="px-6 py-3 rounded-full border-2 border-transparent text-black transition-all duration-300 ease-in-out hover:border-[#C0DDFF]"
        >
          Acasă
        </Link>
        <Link
          href="/programare"
          className="px-6 py-3 rounded-full border-2 border-transparent text-black transition-all duration-300 ease-in-out hover:border-[#C0DDFF]"
        >
          Programare
        </Link>
        <Link
          href="/ajutor"
          className="px-6 py-3 rounded-full border-2 border-transparent text-black transition-all duration-300 ease-in-out hover:border-[#C0DDFF]"
        >
          Ajutor
        </Link>
      </div>

      {/* Hamburger menu icon for smaller screens */}
      <div className="md:hidden flex items-center pr-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-[3vh] flex flex-col md:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 border-b border-gray-200 hover:bg-gray-100 text-black text-lg"
          >
            Acasa
          </Link>
          <Link
            href="/programare"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 border-b border-gray-200 hover:bg-gray-100 text-black text-lg"
          >
            Programare
          </Link>
          <Link
            href="/ajutor"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 hover:bg-gray-100 text-black text-lg"
          >
            Ajutor
          </Link>
        </div>
      )}
    </nav>
  );
}