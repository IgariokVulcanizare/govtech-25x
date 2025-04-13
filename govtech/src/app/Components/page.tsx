"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  // We'll store in local state, but read from localStorage on mount
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"doctor" | "patient" | null>(null);

  // For controlling the mobile hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  // For controlling the "Contul Meu" dropdown
  const [contulMeuOpen, setContulMeuOpen] = useState(false);

  // On mount, read from localStorage
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");

    if (logged === "true") {
      setIsLoggedIn(true);
      if (role === "doctor") {
        setUserRole("doctor");
      } else {
        setUserRole("patient");
      }
    }
  }, []);

  // "Programare" button logic
  // If not logged in => go to /Components/Authenthification
  // If logged in => go to /Components/SelectareMedic
  const handleProgramareClick = () => {
    if (!isLoggedIn) {
      router.push("/Components/Authenthification");
    } else {
      // The user specifically wants to go to /Components/SelectareMedic
      router.push("/Components/SelectareMedic");
    }
  };

  // "Contul Meu" logic
  const handleContulMeuClick = () => {
    // If not logged in => push to Auth
    if (!isLoggedIn) {
      router.push("/Components/Authenthification");
      return;
    }
    // If logged in, toggle the dropdown menu
    setContulMeuOpen((prev) => !prev);
  };

  // When user selects "Logout" from dropdown
  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    setContulMeuOpen(false);
    router.push("/");
  }

  // If user chooses "Profile / Appts" from dropdown
  function handleProfileClick() {
    setContulMeuOpen(false);
    if (userRole === "doctor") {
      router.push("/Components/Doctors/booking");
    } else {
      router.push("/Components/Appointments");
    }
  }

  return (
    <nav className="sticky top-7 z-50 w-full max-w-[1650px] mx-auto bg-white rounded-[3vh] p-4 shadow-[0_0_15px_rgba(0,0,0,0.15)] flex items-center justify-between">
      {/* Logo on the left: click => main page */}
      <div
        className="pl-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/logo2.1.svg"
          alt="Logo"
          width={120}
          height={50}
          priority
        />
      </div>

      {/* Navigation links for medium+ screens */}
      <div className="hidden md:flex items-center pr-4 gap-11 text-black text-xl font-large">
        {/* Programare => calls handleProgramareClick */}
        <button
          onClick={handleProgramareClick}
          className="px-6 py-3 rounded-full border-2 border-transparent text-black transition-all duration-300 ease-in-out hover:border-[#C0DDFF]"
        >
          Programare
        </button>

        {/* "Contul Meu" => toggles a dropdown if user is logged in */}
        <div className="relative">
          <button
            onClick={handleContulMeuClick}
            className="relative px-6 py-3 rounded-full border-2 border-transparent text-black transition-all duration-300 ease-in-out hover:border-[#C0DDFF]"
          >
            {/* If logged in, show a small profile pic on the right side */}
            {isLoggedIn && (
              <span className="absolute -top-2 -right-2">
                <img
                  src="/doctor_asistent.jpg"
                  alt="Profile"
                  className="inline-block w-7 h-7 rounded-full object-cover"
                />
              </span>
            )}
            Contul Meu
          </button>

          {/* Dropdown if contulMeuOpen && isLoggedIn */}
          {isLoggedIn && contulMeuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {userRole === "doctor" ? "Calendar Doctor" : "Programări mele"}
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger menu icon for smaller screens */}
      <div className="md:hidden flex items-center pr-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
          <button
            onClick={() => {
              handleProgramareClick();
              setMenuOpen(false);
            }}
            className="block px-6 py-3 border-b border-gray-200 hover:bg-gray-100 text-black text-lg text-left"
          >
            Programare
          </button>
          <button
            onClick={() => {
              handleContulMeuClick();
              setMenuOpen(false);
            }}
            className="block px-6 py-3 hover:bg-gray-100 text-black text-lg text-left"
          >
            Contul Meu
          </button>
        </div>
      )}
    </nav>
  );
}
