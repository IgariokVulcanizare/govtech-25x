"use client";

import React, { useState } from "react";
import Card from "./Components/Cards";
import Navbar from "./Components/page";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
// Import FAQ data from the same directory. Make sure your bundler supports JSON imports.
import faqData from "./faq.json";

const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const commonWordCount = (str1: string, str2: string): number => {
  const words1: string[] = normalizeText(str1).split(/\s+/);
  const words2: string[] = normalizeText(str2).split(/\s+/);
  return words1.filter((word: string) => words2.includes(word)).length;
};

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Bună ziua, cu ce vă putem ajuta?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Function to choose the best matching answer based on common word count from the FAQ data.
  const getBestResponse = (userMsg: string): string => {
    const input = normalizeText(userMsg.trim());
    let bestMatch = "";
    let bestCount = 0;
    faqData.forEach(
      ({ intrebare, raspuns }: { intrebare: string; raspuns: string }) => {
        const count = commonWordCount(input, intrebare);
        if (count > bestCount) {
          bestCount = count;
          bestMatch = raspuns;
        }
      }
    );
    return bestCount > 0
      ? bestMatch
      : "Îmi pare rău, nu am înțeles. Poți reformula întrebarea?";
  };

  // Handle sending the message.
  const handleSend = () => {
    if (!userInput.trim()) return; // Do not send empty messages
    // Append the user's message.
    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    const answer = getBestResponse(userInput);
    setUserInput("");
    // Simulate a short delay for the assistant's response.
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "assistant", text: answer }]);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative h-430">
      {/* Sticky Navbar */}
      <Navbar />

      {/* First Rectangle */}
      <div className="relative w-[90%] max-w-8xl bg-white rounded-[3.25vh] -mt-19 mb-8 h-[95vh] flex flex-col md:flex-row">
        {/* Left half: Text + Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-7xl font-bold text-[#0077FF] mb-6 ml-6 leading-[1.2]">
            Sănătatea voastră este prioritatea noastră
          </h1>
          <button className="bg-[#0077FF] text-white text-2xl px-6 py-3 rounded-full font-semibold hover:bg-[#005ecc] transition-colors ml-6 w-[40%]">
            Programează-te
          </button>
        </div>

        <div className="w-full md:w-1/2 h-full flex items-center justify-center mt-15 mr-20 ">
          <DotLottieReact
            src="https://lottie.host/8129d2a8-bdf8-4b73-b92d-9550b0795084/5Jr1NePiya.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* Floating circular phone button */}
        <button
          onClick={() => setShowChat(true)}
          className="border-5 border-[#0077FF] text-black text-5xl w-20 h-20 rounded-full flex items-center justify-center hover:border-[#005ecc] hover:text-[#005ecc] transition-colors absolute bottom-6 right-10"
        >
          <FiPhoneCall className="-ml-0.5 mt-1.5" />
        </button>
      </div>


      {/* Chat Panel */}
      {showChat && (
        <div
          className="fixed bottom-20 right-40 w-96 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300"
          style={{ transform: showChat ? "translateY(0)" : "translateY(100%)" }}
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-[15px]">
            <p className="flex-1 text-center font-bold">Asistenta Medicala Online</p>
            <IoIosClose className="text-xl cursor-pointer" onClick={() => setShowChat(false)} />
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "assistant" ? "justify-start" : "justify-end"
                  } items-end space-x-3`}
              >
                {msg.type === "assistant" && (
                  <img
                    src="/doctor_asistent.jpg"
                    alt="assistant avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div
                  className={`p-2 rounded-lg ${msg.type === "assistant" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                >
                  <p className="text-sm text-black">{msg.text}</p>
                </div>
                {msg.type === "user" && (
                  <FaRegUserCircle className="w-10 h-10 rounded-full text-black" />
                )}
              </div>
            ))}
          </div>

          {/* Chat Input Area */}
          <div className="px-4 py-2 border-t flex items-center">
            <textarea
              placeholder="Cu ce va putem ajuta?"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none min-h-[40px] text-black"
              rows={1}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}

      
      {/* Second Rectangle remains unchanged */}
      <div className="w-[90%] max-w-8xl bg-white rounded-[3.25vh] my-8 h-[80vh] px-8 py-6 flex flex-col md:flex-row items-center justify-center">
        
        {/* Left text */}
        <div className="flex gap-7">
          <div className="mb-8 md:mb-0">
            <h1 className="flex text-[38px] font-bold mb-4 w-[300] leading-tight">
              Selectează o opțiune pentru a începe programarea.
            </h1>
            <p className="text-gray-600 font-medium text-lg width max-w-[250px]">
              Ai nevoie de un medic de familie sau un specialist?
            </p>
          </div>

        {/* Right cards */}
          <Card 
            title="Programare medic de familie" 
          />
          <Card 
            title="Programare alt medic" 
          />
        </div>  
      </div>

      <div className="w-[100%] max-w-8xl bg-white rounded-[3.25vh] my-8 h-100"></div>
    </div>
  );
}
