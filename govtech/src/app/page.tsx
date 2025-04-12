"use client";

import React, { useState } from "react";
import Navbar from "./Components/page";
import Hero from "./Components/Hero/page";
export default function Home() {

  return (
    <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative">
      <Navbar />
      <Hero />
    </div>
  );
}