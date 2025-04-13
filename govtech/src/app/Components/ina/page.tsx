"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define o bază de date mock cu un exemplu de utilizator
const mockDatabase = [
  {
    idnp: "1234567890123",
    nume: "Popescu",
    prenume: "Ion",
    dataNasterii: "1980-01-01", // format YYYY-MM-DD
    telefon: "0712345678",
  },
  // Poți adăuga și alte înregistrări de test dacă este necesar.
];

export default function Authentification() {
  // State-urile pentru câmpurile formularului
  const [idnp, setIdnp] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [dataNasterii, setDataNasterii] = useState("");
  const [telefon, setTelefon] = useState("");

  // State-uri pentru modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const router = useRouter();

  // Mesajele de încărcare (se vor afișa unul câte unul)
  const loadingMessages = [
    "Colectăm datele...",
    "Verificăm informațiile furnizate...",
    "Pregătim conexiunea securizată...",
    "Vă rugăm să aveți răbdare, aproape gata!"
  ];

  // Handler pentru trimiterea formularului (autentificare pe baza bazei de date mock)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulăm un delay asincron, ca în cazul unui apel de rețea
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Căutăm utilizatorul în baza de date mock
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
   * Deschide modalul și pornește secvența de „încărcare”.
   */
  const handleAuthClick = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setShowSuccess(false);
    setLoadingStep(0);
  };

  /**
   * useEffect pentru actualizarea mesajelor de încărcare:
   * - Se afișează un singur mesaj la un moment dat.
   * - După ce ultimul mesaj a fost afișat, se trece la starea de succes.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      if (loadingStep < loadingMessages.length - 1) {
        timer = setTimeout(() => {
          setLoadingStep((prev) => prev + 1);
        }, 3000); // Afișează fiecare mesaj timp de 3 secunde
      } else {
        // După ultimul mesaj, așteptăm încă 3 secunde și apoi trecem la starea de succes
        timer = setTimeout(() => {
          setIsLoading(false);
          setShowSuccess(true);
        }, 3000);
      }
    }
    return () => clearTimeout(timer);
  }, [isLoading, loadingStep]);

  // Handler pentru închiderea popup-ului (la apăsarea butonului OK)
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="bg-gray-100 min-h-screen text-black p-8 flex items-center justify-center">
      {/* Popup/Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            {isLoading && (
              <div>
                <div className="mb-4 flex justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                {/* Se afișează un singur mesaj la un moment dat */}
                <p className="text-lg font-semibold mb-2">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
            )}
            {showSuccess && (
              <div>
                <div className="mb-4 flex justify-center animate-bounce">
                  {/* Animație cu bifa verde */}
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {/* Mesajul de succes */}
                <p className="text-lg font-semibold mb-4">Bine ați venit!</p>
                {/* Butonul OK */}
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

      <div className="bg-white w-full max-w-5xl p-8 rounded-md shadow-md grid grid-cols-[1fr_auto_1fr] gap-8">
        {/* Secțiunea stângă */}
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-2xl font-bold mb-4">Intră în cont</h2>
          <p className="text-lg mb-6 leading-snug">
            Înregistrează-te cu
            <br />
            semnătura digitală
          </p>

          {/* Butoanele pentru MPass și EvoSign */}
          <div className="space-y-2">
            <button
              onClick={handleAuthClick}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              MPass
            </button>
            <button
              onClick={handleAuthClick}
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              EvoSign
            </button>
          </div>
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
    </main>
  );
}
