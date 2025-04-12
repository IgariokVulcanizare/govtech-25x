import React from 'react';
import { CiStethoscope } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";

const MyPage = () => {
  return (
    <div
      className="min-h-screen bg-[#B1D6FF] flex items-center justify-center"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="relative w-[90%] max-w-8xl bg-white rounded-[3.25vh] -mt-19 mb-8 h-[65vh] flex flex-col md:flex-row">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-7xl font-bold text-black mb-6 ml-15 leading-[1.2]">
            Selectează o opțiune pentru a începe programarea.
          </h1>
          <h6 className="text-3xl text-black mb-6 ml-15 leading-[1.2]">
            Ai nevoie de un medic de familie sau un specialist?
          </h6>
        </div>

        {/* Two Rectangles Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* First Rectangle */}
            <div className="bg-white border border-gray-300 shadow-md rounded-3xl p-6 w-[400px] h-[480px] flex flex-col">
              {/* Heading with Text on Left, Icon on Right */}
              <div className="flex items-center mb-4">
                <div className="w-2/3">
                  <h3 className="text-4xl text-black leading-tight ml-2">
                    Programare medic de familie
                  </h3>
                </div>
                <div className="w-1/2 flex justify-center">
                  <CiStethoscope className="text-9xl text-blue-600" />
                </div>
              </div>
              
              {/* Button Centered at Bottom */}
              <div className="flex-grow flex items-center justify-center">
                <button className="bg-blue-500 text-white text-4xl px-16 py-4 rounded-xl hover:bg-blue-600 transition-colors mt-49">
                  Click aici
                </button>
              </div>
            </div>

            {/* Second Rectangle */}
            <div className="bg-white border border-gray-300 shadow-md rounded-3xl p-6 w-[400px] h-[480px] flex flex-col">
              {/* Heading with Text on Left, Icon on Right */}
              <div className="flex items-center mb-4">
                <div className="w-2/3">
                  <h3 className="text-4xl text-black leading-tight">
                    Programare alt medic
                  </h3>
                </div>
                <div className="w-1/3 flex justify-center">
                  <FaUserDoctor className="text-8xl text-blue-600" />
                </div>
              </div>

              {/* Button Centered at Bottom */}
              <div className="flex-grow flex items-center justify-center">
                <button className="bg-blue-500 text-white text-4xl px-16 py-4 rounded-xl hover:bg-blue-600 transition-colors mt-60">
                  Click aici
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
