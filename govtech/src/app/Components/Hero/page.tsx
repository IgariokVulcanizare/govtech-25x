"use client";

import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
// Import your FAQ JSON file (adjust the path as needed)
import faqData from "../../faq.json";

interface FAQItem {
  intrebare: string;
  raspuns: string;
}

// Cast the imported JSON to an array of FAQItem
const faq = faqData as FAQItem[];

type Message = {
  type: "assistant" | "user";
  text: string;
};

export default function Hero() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      text: "Bună ziua, cu ce vă putem ajuta?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  // Function that checks if the user input exactly matches any FAQ question
  const matchFAQ = (input: string): string | null => {
    // Normalize user input
    const normalizedInput = input.toLowerCase().trim();
    // Find an FAQ entry where the question matches exactly
    const entry = faq.find(
      (item) => item.intrebare.toLowerCase().trim() === normalizedInput
    );
    return entry ? entry.raspuns : null;
  };

  // Updated send handler
  const handleSend = () => {
    if (!userInput.trim()) return; // Do not send empty messages

    // Append the user's message to the conversation
    setMessages((prev) => [...prev, { type: "user", text: userInput }]);

    // Look for an exact FAQ match
    const matchedAnswer = matchFAQ(userInput);
    // Clear the input immediately
    setUserInput("");

    // Simulate a delay before showing the assistant's answer
    setTimeout(() => {
      if (matchedAnswer) {
        setMessages((prev) => [
          ...prev,
          { type: "assistant", text: matchedAnswer },
        ]);
      } else {
        // Fallback answer if no match is found
        setMessages((prev) => [
          ...prev,
          {
            type: "assistant",
            text: "Ne pare rău, nu am găsit informații relevante.",
          },
        ]);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative">
      {/* Hero Section */}
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

        {/* Right half: Lottie animation */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center mt-15 mr-20">
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
            <p className="flex-1 text-center font-bold">
              Asistența Medicală Online
            </p>
            <IoIosClose
              className="text-xl cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "assistant" ? "justify-start" : "justify-end"
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
                  className={`p-2 rounded-lg ${
                    msg.type === "assistant" ? "bg-blue-100" : "bg-gray-100"
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
              placeholder="Cu ce vă putem ajuta?"
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
    </div>
  );
}
