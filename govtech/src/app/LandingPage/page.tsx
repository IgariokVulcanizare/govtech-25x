"use client";

import Navbar from "../Components/page";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative">
      {/* Sticky Navbar */}
      <Navbar />

      {/* First Rectangle: shifted upward so that its top aligns with the navbar area.
          The rectangle now uses flex-direction based on the viewport:
          - On small screens: stacked vertically.
          - On medium and larger screens: two columns */}
      <div className="w-[90%] max-w-8xl bg-white rounded-[3.25vh] -mt-17 mb-8 h-[95vh] flex flex-col md:flex-row">
        {/* Left half: Text + Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          {/* Large, blue heading with custom precise line height */}
          <h1 className="text-7xl font-bold text-[#0077FF] mb-6 ml-[25px] leading-[1.2]">
            Sănătatea voastră este prioritatea noastră
          </h1>
          {/* Blue button */}
          <button className="bg-[#0077FF] text-white text-2xl px-6 py-3 rounded-full font-semibold hover:bg-[#005ecc] transition-colors ml-[25px] w-[40%]">
            Programează-te
          </button>
        </div>

        {/* Right half: Lottie animation taking up half of the container.
            A top margin is applied on small screens to add spacing when stacked. */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center mt-15 mr-20">
          <DotLottieReact
            src="https://lottie.host/8129d2a8-bdf8-4b73-b92d-9550b0795084/5Jr1NePiya.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* Second Rectangle remains unchanged */}
      <div className="w-[90%] max-w-8xl bg-white rounded-[3.25vh] my-8 h-[80vh]">
      </div>
    </div>
  );
}
