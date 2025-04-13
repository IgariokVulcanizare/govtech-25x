"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

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
  // State for QR Code modal (EVO)
  const [showQRCode, setShowQRCode] = useState(false);

  // State management for form fields – correspond to the database columns
  const [idnp, setIdnp] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [dataNasterii, setDataNasterii] = useState("");
  const [telefon, setTelefon] = useState("");

  const router = useRouter();

  // State-uri pentru modalul de încărcare & succes (MPass)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Mesajele de încărcare (se va afișa câte unul la un moment dat)
  const loadingMessages = [
    "Colectăm datele...",
    "Verificăm informațiile furnizate...",
    "Pregătim conexiunea securizată...",
    "Vă rugăm să aveți răbdare, aproape gata!"
  ];

  // Handler pentru trimiterea formularului (pe baza mockDatabase)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulăm un delay asincron (ca la un apel de rețea)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockDatabase.find(
      (user) =>
        user.idnp === idnp &&
        user.nume.toLowerCase() === nume.toLowerCase() &&
        user.prenume.toLowerCase() === prenume.toLowerCase() &&
        user.dataNasterii === dataNasterii &&
        user.telefon === telefon
    );

    if (foundUser) {
      router.push("./SelectareMedic");
    } else {
      alert("Date incorecte. Vă rugăm să verificați și să încercați din nou.");
    }
  };

  /**
   * Acest handler deschide modalul de încărcare pentru MPass,
   * inițializând stările de loading și succes.
   */
  const handleAuthClick = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setShowSuccess(false);
    setLoadingStep(0);
  };

  /**
   * useEffect pentru actualizarea mesajelor de încărcare:
   * - Se afișează câte un mesaj la un moment dat.
   * - După ce ultimul mesaj a fost afișat și a trecut timpul de așteptare,
   *   se trece la starea de succes.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      if (loadingStep < loadingMessages.length - 1) {
        timer = setTimeout(() => {
          setLoadingStep((prev) => prev + 1);
        }, 3000); // 3 secunde pentru fiecare mesaj
      } else {
        timer = setTimeout(() => {
          setIsLoading(false);
          setShowSuccess(true);
        }, 3000);
      }
    }
    return () => clearTimeout(timer);
  }, [isLoading, loadingStep]);

  // Handler pentru închiderea popup-ului de succes (butonul OK)
  const handleOk = () => {
    setIsModalOpen(false);
    router.push("./SelectareMedic");
  };
  

  return (
    <main className="bg-gray-100 min-h-screen text-black p-8 flex items-center justify-center relative">
      {/* Container principal – blur dacă e activ modalul de loading/succes */}
      <div className={`${isModalOpen ? "blur-sm" : ""} transition duration-300 ease-in-out`}>
        <div className="bg-white w-full max-w-5xl p-8 rounded-md shadow-md grid grid-cols-[1fr_auto_1fr] gap-8">
          {/* Secțiunea stângă */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-4xl text-center font-bold mb-6 leading-snug w-full">
              Autentifică-te
              <br />
              cu semnătura digitală
            </h1>
            {/* Butonul MPass – declanșează feature-ul cu încărcare și succes */}
            <button
              onClick={handleAuthClick}
              type="button"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-lg text-white text-center font-semibold py-3 w-full align-center rounded-md transition-colors shadow-sm mb-4"
            >
              MPass
            </button>
            {/* Butonul EVO – rămâne neschimbat */}
            <button
              type="button"
              onClick={() => setShowQRCode(true)}
              className="inline-block bg-white hover:bg-gray-100 text-lg text-black text-center font-semibold py-3 w-full rounded-md transition-colors duration-200 shadow-md"
            >
              EVO
            </button>
          </div>

          {/* Separator vertical */}
          <div className="w-[1px] bg-gray-300" />

          {/* Secțiunea dreaptă: Formularul de autentificare */}
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
      </div>

      {/* Modal pentru feature-ul MPass (încărcare + succes) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            {isLoading && (
              <div>
                <div className="mb-4 flex justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-semibold mb-2">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            )}
            {showSuccess && (
              <div>
                <div className="mb-4 flex justify-center animate-bounce">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold mb-4">Bine ați venit!</p>
                <button
                  onClick={handleOk}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal pentru codul QR (EVO) */}
      {showQRCode && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-center font-semibold text-lg mb-4">
              Scanează codul EVO
            </h2>
            <Image
              src="/QR-EVO.png"
              alt="EVO QR Code"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
      )}
    </main>
  );
}
