"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Define a mock database with one example user
const mockDatabase = [
  {
    idnp: "1234567890123",
    nume: "Popescu",
    prenume: "Ion",
    dataNasterii: "1980-01-01", // format YYYY-MM-DD
    telefon: "0712345678",
  },
  // You can add additional mock records here if needed.
];

export default function Authentification() {
  // State management for form fields – correspond to the database columns
  const [idnp, setIdnp] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [dataNasterii, setDataNasterii] = useState(""); // corresponds to 'data_nasterii'
  const [telefon, setTelefon] = useState("");

  const router = useRouter();

  // Handler for the form submission using the mock database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mimic an async delay (for example, as if making a network call)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Search for a matching record within the mock database
    const foundUser = mockDatabase.find(
      (user) =>
        user.idnp === idnp &&
        user.nume.toLowerCase() === nume.toLowerCase() &&
        user.prenume.toLowerCase() === prenume.toLowerCase() &&
        user.dataNasterii === dataNasterii &&
        user.telefon === telefon
    );

    if (foundUser) {
      // If a match is found, redirect to the 'SelectareMedic' component/page
      router.push("./SelectareMedic");
    } else {
      // If no match is found, notify the user
      alert("Date incorecte. Vă rugăm să verificați și să încercați din nou.");
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen text-black p-8 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl p-8 rounded-md shadow-md grid grid-cols-[1fr_auto_1fr] gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-2xl font-bold mb-4">Intră în cont</h2>
          <p className="text-lg mb-6 leading-snug">
            Înregistrează-te cu
            <br />
            semnătura digitală
          </p>
          <a
            href="https://mpass.gov.md/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            MPass
          </a>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-gray-300" />

        {/* Right Section: Authentication Form */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
            <div>
              <label htmlFor="idnp" className="block font-medium mb-1">
                IDNP
              </label>
              <input
                id="idnp"
                type="text"
                value={idnp}
                onChange={(e) => setIdnp(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Introduceți IDNP..."
              />
            </div>

            <div>
              <label htmlFor="nume" className="block font-medium mb-1">
                Nume
              </label>
              <input
                id="nume"
                type="text"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Introduceți numele..."
              />
            </div>

            <div>
              <label htmlFor="prenume" className="block font-medium mb-1">
                Prenume
              </label>
              <input
                id="prenume"
                type="text"
                value={prenume}
                onChange={(e) => setPrenume(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Introduceți prenumele..."
              />
            </div>

            <div>
              <label htmlFor="dataNasterii" className="block font-medium mb-1">
                Data nașterii
              </label>
              <input
                id="dataNasterii"
                type="date"
                value={dataNasterii}
                onChange={(e) => setDataNasterii(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="telefon" className="block font-medium mb-1">
                Număr de telefon
              </label>
              <input
                id="telefon"
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Introduceți telefonul..."
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
            >
              Autentificare
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
