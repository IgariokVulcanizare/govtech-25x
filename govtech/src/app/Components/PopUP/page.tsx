'use client';
import React, { useState } from 'react';

export default function Authentification() {
  // State management for form fields
  const [idnp, setIdnp] = useState('');
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [dataNasterii, setDataNasterii] = useState('');
  const [telefon, setTelefon] = useState('');

  // State to control the modal and chosen role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState<'pacient' | 'medic' | null>(null);

  // When the form is submitted, open the role selection modal.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // When the user selects a role, close the modal and process the data.
  const handleRoleSelection = (selectedRole: 'pacient' | 'medic') => {
    setRole(selectedRole);
    setIsModalOpen(false);
    // Now you can add role-dependent logic (e.g., redirect to different pages or show different features)
    console.log({
      idnp,
      nume,
      prenume,
      dataNasterii,
      telefon,
      role: selectedRole,
    });
  };

  return (
    <main className="relative bg-gray-100 min-h-screen text-black p-8 flex items-center justify-center">
      {/* Form container; apply blur when modal is open */}
      <div
        className={`bg-white w-full max-w-5xl p-8 rounded-md shadow-md grid grid-cols-[1fr_auto_1fr] gap-8 transition-all duration-300 ${
          isModalOpen ? 'filter blur-sm pointer-events-none' : ''
        }`}
      >
        {/* Left section */}
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

        {/* Vertical divider */}
        <div className="w-[1px] bg-gray-300" />

        {/* Right section: the form */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleFormSubmit} className="space-y-4 w-full max-w-sm">
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

      {/* Modal for role selection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-md">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4">Intră ca:</h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleRoleSelection('pacient')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-transform transform hover:-translate-y-1"
              >
                Pacient
              </button>
              <button
                onClick={() => handleRoleSelection('medic')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-transform transform hover:-translate-y-1"
              >
                Medic
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
