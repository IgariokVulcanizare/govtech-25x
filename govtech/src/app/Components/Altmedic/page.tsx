'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SchedulingPage.css';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

const SchedulingPage = () => {
  // Extended list of cities in Moldova
  const cities = [
    'Chișinău',
    'Bălți',
    'Cahul',
    'Orhei',
    'Ungheni',
    'Soroca',
    'Comrat',
    'Edineț',
    'Briceni',
    'Hîncești',
    'Căușeni',
    'Rezina'
  ];

  // Hospitals by city
  const hospitalsByCity: { [key: string]: string[] } = {
    'Chișinău': [
      'Spitalul Clinic Municipal',
      'Spitalul Republican',
      'Medpark',
      'Spitalul de Urgență',
      'Spitalul Sfânta Treime'
    ],
    'Bălți': [
      'Spitalul Municipal Bălți',
      'Clinica MedExpert Bălți',
      'Clinica Sănătate Bălți'
    ],
    'Cahul': ['Spitalul Raional Cahul', 'Clinica Sănătate Cahul'],
    'Orhei': ['Spitalul Raional Orhei', 'Clinica Orhei'],
    'Ungheni': ['Spitalul Raional Ungheni', 'Centrul Medical Ungheni'],
    'Soroca': ['Spitalul Raional Soroca', 'Clinica Soroca'],
    'Comrat': ['Spitalul Raional Comrat', 'Clinica Comrat'],
    'Edineț': ['Spitalul Raional Edineț', 'Clinica Edineț'],
    'Briceni': ['Spitalul Raional Briceni'],
    'Hîncești': ['Spitalul Central Hîncești'],
    'Căușeni': ['Spitalul Raional Căușeni'],
    'Rezina': ['Spitalul Raional Rezina']
  };

  // Extended departments list
  const departments = [
    'Pediatrie',
    'Cardiologie',
    'Dermatologie',
    'Ortopedie',
    'Ginecologie',
    'Neurologie',
    'Psihiatrie',
    'Oftalmologie',
    'Oncologie'
  ];

  // Doctor details (unchanged)
  const doctorDetailsByDepartment: { [key: string]: Doctor[] } = {
    Pediatrie: [
      { name: 'Dr. Tacu Igor', specialty: 'Chirurg pediatru', image: 'igariok.jpg' },
      { name: 'Dr. Toderiță Loredana', specialty: 'Asistentă medicală', image: 'lori.jpg' },
      { name: 'Dr. Pancenco Ina', specialty: 'Anesteziolog', image: 'inadoc.jpg' },
      { name: 'Dr. Rusnac Nichita', specialty: 'Terapeut', image: 'nichitadoc.jpg' }
    ],
    Cardiologie: [
      { name: 'Dr. Tacu Igor', specialty: 'Cardiolog', image: 'igariok.jpg' },
      { name: 'Dr. Toderiță Loredana', specialty: 'Asistentă cardiologie', image: 'lori.jpg' },
      { name: 'Dr. Pancenco Ina', specialty: 'Anesteziolog', image: 'inadoc.jpg' },
      { name: 'Dr. Rusnac Nichita', specialty: 'Terapeut', image: 'nichitadoc.jpg' }
    ],
    Dermatologie: [
      { name: 'Dr. Tacu Igor', specialty: 'Dermatolog', image: 'igariok.jpg' },
      { name: 'Dr. Toderiță Loredana', specialty: 'Asistentă dermatologie', image: 'lori.jpg' },
      { name: 'Dr. Pancenco Ina', specialty: 'Anesteziolog', image: 'inadoc.jpg' },
      { name: 'Dr. Rusnac Nichita', specialty: 'Terapeut', image: 'nichitadoc.jpg' }
    ],
    Ortopedie: [
      { name: 'Dr. Tacu Igor', specialty: 'Chirurg ortoped', image: 'igariok.jpg' },
      { name: 'Dr. Toderiță Loredana', specialty: 'Asistentă ortopedie', image: 'lori.jpg' },
      { name: 'Dr. Pancenco Ina', specialty: 'Anesteziolog', image: 'inadoc.jpg' },
      { name: 'Dr. Rusnac Nichita', specialty: 'Terapeut', image: 'nichitadoc.jpg' }
    ]
  };

  // State variables
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState('');

  const router = useRouter(); // Initialize router

  // Available hours logic
  const getAvailableHours = (date: Date): string[] => {
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      const currentHour = now.getHours();
      return ['08:00', '10:00', '12:00', '14:00', '16:00'].filter((hour) => {
        const [h] = hour.split(':').map(Number);
        return h > currentHour;
      });
    }
    if (date.getDay() === 0) return [];
    return ['08:00', '10:00', '12:00', '14:00', '16:00'];
  };

  const availableHours = selectedDate ? getAvailableHours(selectedDate) : [];

  // Handle "Programează" button click to redirect
  const handleProgramare = () => {
    // Redirect to the Appointments page
    router.push('./Appointments');
  };

  return (
    <div className="p-8 font-sans bg-[#B1D6FF] min-h-screen">
      <div className="bg-white rounded-2xl p-6 shadow-xl transition-all main-card max-w-8xl mx-[20px]">
        <h1 className="text-3xl font-bold mb-8 text-black">Programare medicală</h1>

        {/* White card for dropdowns (grid layout) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-black font-semibold mb-1">Oraș</label>
            <select
              className="p-3 w-full bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedHospital('');
                setSelectedDepartment('');
                setSelectedDoctor(null);
                setSelectedDate(null);
                setSelectedHour('');
              }}
            >
              <option value="">Selectează orașul</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-black font-semibold mb-1">Spital</label>
            <select
              className="p-3 w-full bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              value={selectedHospital}
              onChange={(e) => {
                setSelectedHospital(e.target.value);
                setSelectedDepartment('');
                setSelectedDoctor(null);
                setSelectedDate(null);
                setSelectedHour('');
              }}
              disabled={!selectedCity}
            >
              <option value="">Selectează spitalul</option>
              {selectedCity &&
                hospitalsByCity[selectedCity]?.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-black font-semibold mb-1">Departamentul</label>
            <select
              className="p-3 w-full bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedDoctor(null);
                setSelectedDate(null);
                setSelectedHour('');
              }}
              disabled={!selectedHospital}
            >
              <option value="">Selectează departamentul</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specialists, Calendar, Hours */}
        {selectedDepartment && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-black pt-[35px]">
              Alege un specialist
            </h2>

            {doctorDetailsByDepartment[selectedDepartment] ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {doctorDetailsByDepartment[selectedDepartment]?.map((doctor) => (
                  <div
                    key={doctor.name}
                    className={`specialist-card cursor-pointer ${
                      selectedDoctor?.name === doctor.name ? 'specialist-card--active' : ''
                    }`}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setSelectedDate(null);
                      setSelectedHour('');
                    }}
                  >
                    <div className="doctor-avatar">
                      <img
                        src={'/' + doctor.image}
                        alt={doctor.name}
                        className="specialist-image"
                      />
                    </div>
                    <div className="specialist-info">
                      <h4 className="text-black">{doctor.name}</h4>
                      <p className="text-black">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-black">
                Momentan nu sunt doctori disponibili pentru acest departament.
              </p>
            )}
          </>
        )}

        {selectedDoctor && (
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2 calendar-wrapper">
              <h2 className="text-xl font-semibold mb-4 text-black">Alege data</h2>
              <Calendar
                onChange={(value) => {
                  setSelectedDate(value as Date);
                  setSelectedHour('');
                }}
                value={selectedDate}
                locale="ro-RO"
                tileDisabled={({ date }) => {
                  const today = new Date();
                  return date < today || date.getDay() === 0;
                }}
                tileClassName={({ date }) => {
                  const today = new Date();
                  if (date < today || date.getDay() === 0) {
                    return 'text-gray-400 pointer-events-none';
                  }
                  return '';
                }}
                className="calendar-container"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-black">Ore disponibile</h2>
              {selectedDate && availableHours.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6 hours-container">
                  {availableHours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`hour-button ${selectedHour === hour ? 'hour-button--active' : ''}`}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              )}
              {selectedDate && availableHours.length === 0 && (
                <p className="mt-4 text-red-500">
                  Nu mai sunt ore disponibile pentru această zi.
                </p>
              )}
              {selectedHour && (
                <button
                  onClick={handleProgramare}
                  className="submit-button mt-auto self-start "
                >
                  Programează-mă
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingPage;
