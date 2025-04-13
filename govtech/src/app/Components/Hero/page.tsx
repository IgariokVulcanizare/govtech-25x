"use client";

import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OpenAI from "openai";  // 1) Import the OpenAI class

// 2) Instantiate openai with your config
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "sk-or-v1-...", // your actual key
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://igortacu.com",
    "X-Title": "EasyMed",
  },
});

export default function Hero() {
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Bună ziua, cum vă putem ajuta?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return; // Previne trimiterea mesajelor goale

    const currentMessage = userInput;
    setMessages((prev) => [...prev, { type: "user", text: currentMessage }]);
    setUserInput("");

    try {
      // 3) Use the openai instance
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1-zero:free",
        messages: [
          {
            role: "system",
            content:
              "Te rog să oferi un răspuns super scurt in limba romana, organizat în bullet points simple. Fiecare punct trebuie să înceapă cu '-' urmat de un spațiu. Folosește doar text simplu, fără formatare, HTML, markup sau caractere speciale.",
          },
          {
            role: "user",
            content: currentMessage,
          },
        ],
      });

      const answer =
        completion &&
        completion.choices &&
        completion.choices[0] &&
        completion.choices[0].message &&
        completion.choices[0].message.content
          ? completion.choices[0].message.content
          : "Ne pare rău, nu am găsit informații relevante.";

      setMessages((prev) => [...prev, { type: "assistant", text: answer }]);
    } catch (error) {
      console.error("Eroare la apelul API:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          text: "Ne pare rău, a apărut o eroare la procesarea cererii.",
        },
      ]);
    }
  };

  const redirectToAuth = () => {
    router.push("./Components/Authenthification");
  };

  return (
    <div className="min-h-screen w-full bg-[#B1D6FF] flex flex-col items-center relative">
      {/* Secțiunea principală (Hero Section) */}
      <div className="relative w-[90%] max-w-8xl bg-white rounded-[3.25vh] -mt-19 mb-8 h-[95vh] flex flex-col md:flex-row">
        {/* Partea stângă: Text + Buton */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-7xl font-bold text-[#0077FF] mb-6 ml-6 leading-[1.2]">
            Sănătatea voastră este prioritatea noastră
          </h1>
          <button
            onClick={redirectToAuth}
            className="bg-[#0077FF] text-white text-2xl px-6 py-3 rounded-full font-semibold hover:bg-[#005ecc] transition-colors ml-6 w-[40%]"
          >
            Programează-te
          </button>
        </div>

        {/* Partea dreaptă: Animație Lottie */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center mt-15 mr-20">
          <DotLottieReact
            src="https://lottie.host/8129d2a8-bdf8-4b73-b92d-9550b0795084/5Jr1NePiya.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* Buton circular flotant (telefon) */}
        <button
          onClick={() => setShowChat(true)}
          className="border-5 border-[#0077FF] text-black text-5xl w-20 h-20 rounded-full flex items-center justify-center hover:border-[#005ecc] hover:text-[#005ecc] transition-colors absolute bottom-6 right-10"
        >
          <FiPhoneCall className="-ml-0.5 mt-1.5" />
        </button>
      </div>

      {/* Panoul de chat */}
      {showChat && (
        <div
          className="fixed bottom-20 right-40 w-96 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300"
          style={{ transform: showChat ? "translateY(0)" : "translateY(100%)" }}
        >
          {/* Header-ul de chat */}
          <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-[15px]">
            <p className="flex-1 text-center font-bold">
              Asistența Medicală Online
            </p>
            <IoIosClose
              className="text-xl cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>

          {/* Corpul chatului */}
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
                    alt="avatar asistent"
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

          {/* Zona de input pentru chat */}
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
