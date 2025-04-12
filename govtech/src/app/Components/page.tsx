"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-8 z-50 w-[87%] mx-auto bg-white rounded-[3vh] p-4 shadow-[0_0_15px_rgba(0,0,0,0.15)] flex items-center justify-between text-black">
      {/* Logo on the left */}
      <div className="pl-4">
        <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
      </div>

      {/* Navigation links for medium+ screens */}
      <div className="hidden md:flex gap-6 pr-4">
        <Link
          href="/"
          className="px-4 py-2 border-2 border-transparent rounded-full transition-all duration-300 ease-in-out hover:border-blue-500"
        >
          Acasa
        </Link>
        <Link
          href="/programare"
          className="px-4 py-2 border-2 border-transparent rounded-full transition-all duration-300 ease-in-out hover:border-blue-500"
        >
          Programare
        </Link>
        <Link
          href="/ajutor"
          className="px-4 py-2 border-2 border-transparent rounded-full transition-all duration-300 ease-in-out hover:border-blue-500"
        >
          Ajutor
        </Link>
      </div>

      {/* Hamburger menu icon for smaller screens */}
      <div className="md:hidden flex items-center pr-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-[3vh] flex flex-col md:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
          >
            Acasa
          </Link>
          <Link
            href="/programare"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
          >
            Programare
          </Link>
          <Link
            href="/ajutor"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Ajutor
          </Link>
        </div>
      )}
    </nav>
  );
}
