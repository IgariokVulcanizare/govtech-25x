'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SchedulingPage.css';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
  nextAvailableDate: Date; // the earliest day they accept appointments
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

  // Example doctor details with nextAvailableDate
  const doctorDetailsByDepartment: { [key: string]: Doctor[] } = {
    Pediatrie: [
      { 
        name: 'Dr. Tacu Igor', 
        specialty: 'Chirurg pediatru', 
        image: 'igariok.jpg',
        nextAvailableDate: new Date('2025-05-14'), 
      },
      { 
        name: 'Dr. Toderiță Loredana', 
        specialty: 'Asistentă medicală', 
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-15'), 
      },
      { 
        name: 'Dr. Pancenco Ina', 
        specialty: 'Anesteziolog', 
        image: 'inadoc.jpg',
        nextAvailableDate: new Date('2025-05-16'), 
      },
      { 
        name: 'Dr. Rusnac Nichita', 
        specialty: 'Terapeut', 
        image: 'nichitadoc.jpg',
        nextAvailableDate: new Date('2025-05-20'), 
      }
    ],
    Cardiologie: [
      { 
        name: 'Dr. Popescu Dan', 
        specialty: 'Cardiolog', 
        image: 'doctor_asistent.jpg', 
        nextAvailableDate: new Date('2025-05-10'),
      },
      {
        name: 'Dr. Enache Raluca',
        specialty: 'Cardiolog intervenționist',
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-12'),
      }
    ],
    Dermatologie: [
      { 
        name: 'Dr. Tacu Igor', 
        specialty: 'Dermatolog', 
        image: 'igariok.jpg',
        nextAvailableDate: new Date('2025-05-14'), 
      },
      { 
        name: 'Dr. Toderiță Loredana', 
        specialty: 'Asistentă dermatologie', 
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-17'), 
      },
      { 
        name: 'Dr. Pancenco Ina', 
        specialty: 'Anesteziolog', 
        image: 'inadoc.jpg',
        nextAvailableDate: new Date('2025-05-19'),
      },
      { 
        name: 'Dr. Rusnac Nichita', 
        specialty: 'Terapeut', 
        image: 'nichitadoc.jpg',
        nextAvailableDate: new Date('2025-05-20'),
      }
    ],
    Ortopedie: [
      { 
        name: 'Dr. Tacu Igor', 
        specialty: 'Chirurg ortoped', 
        image: 'igariok.jpg',
        nextAvailableDate: new Date('2025-05-10'), 
      },
      { 
        name: 'Dr. Toderiță Loredana', 
        specialty: 'Asistentă ortopedie', 
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-12'), 
      },
      { 
        name: 'Dr. Pancenco Ina', 
        specialty: 'Anesteziolog', 
        image: 'inadoc.jpg',
        nextAvailableDate: new Date('2025-05-16'),
      },
    ],
    Ginecologie: [
      {
        name: 'Dr. Postolache Livia',
        specialty: 'Ginecolog specialist',
        image: 'doctor_asistent.jpg',
        nextAvailableDate: new Date('2025-06-01'),
      },
      {
        name: 'Dr. Andronic Selina',
        specialty: 'Obstetrică-Ginecologie',
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-22'),
      }
    ],
    Neurologie: [
      {
        name: 'Dr. Radu Cristian',
        specialty: 'Neurolog',
        image: 'igariok.jpg',
        nextAvailableDate: new Date('2025-05-18'),
      },
      {
        name: 'Dr. Tanesci Teodor',
        specialty: 'Neurochirurg',
        image: 'inadoc.jpg',
        nextAvailableDate: new Date('2025-06-03'),
      }
    ],
    Psihiatrie: [
      {
        name: 'Dr. Balan Maria',
        specialty: 'Psihiatru',
        image: 'nichitadoc.jpg',
        nextAvailableDate: new Date('2025-06-02'),
      },
      {
        name: 'Dr. Cosmescu Adrian',
        specialty: 'Psiholog consultant',
        image: 'doctor_asistent.jpg',
        nextAvailableDate: new Date('2025-05-28'),
      }
    ],
    Oftalmologie: [
      {
        name: 'Dr. Luca Aurelia',
        specialty: 'Oftalmolog',
        image: 'inadoc.jpg',
        nextAvailableDate: new Date('2025-05-25'),
      },
      {
        name: 'Dr. Gavril Marius',
        specialty: 'Oftalmolog pediatric',
        image: 'nichitadoc.jpg',
        nextAvailableDate: new Date('2025-06-05'),
      }
    ],
    Oncologie: [
      {
        name: 'Dr. Busuioc Cristian',
        specialty: 'Oncolog',
        image: 'lori.jpg',
        nextAvailableDate: new Date('2025-05-30'),
      },
      {
        name: 'Dr. Elefteriu Sorina',
        specialty: 'Oncolog radioterapie',
        image: 'doctor_asistent.jpg',
        nextAvailableDate: new Date('2025-06-01'),
      }
    ],
  };

  // State variables for selections
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState('');

  // Popup state for confirmation
  const [showPopup, setShowPopup] = useState(false);
  // Retrieve user role (e.g., 'doctor') from localStorage
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  // Get available hours for a given date.
  const getAvailableHours = (date: Date): string[] => {
    const now = new Date();
    // If chosen date is today, only show future hours
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
    // If Sunday => no hours
    if (date.getDay() === 0) return [];
    // Otherwise show all
    return ['08:00', '10:00', '12:00', '14:00', '16:00'];
  };

  // Recompute available hours whenever selectedDate changes
  const availableHours = selectedDate ? getAvailableHours(selectedDate) : [];

  // Read user role from localStorage on mount.
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // When user selects a new doctor, preselect the date to the doctor's next available date
  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(doctor.nextAvailableDate);
    setSelectedHour('');
  };

  // Helper to format date (dd.mm.yyyy)
  function formatDate(dateObj: Date): string {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  // Handle "Programează-mă" button click
  const handleProgramare = () => {
    // Show popup if an hour is selected
    if (selectedHour) {
      setShowPopup(true);
    }
  };

  return (
    <div className="p-8 font-sans bg-[#B1D6FF] min-h-screen">
      <div className="bg-white rounded-2xl p-6 shadow-xl transition-all main-card max-w-8xl mx-[20px]">
        <h1 className="text-3xl font-bold mb-8 text-black">Programare medicală</h1>

        {/* Dropdown selectors */}
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
            {doctorDetailsByDepartment[selectedDepartment]?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {doctorDetailsByDepartment[selectedDepartment].map((doctor) => {
                  const isSelected = selectedDoctor?.name === doctor.name;
                  return (
                    <div
                      key={doctor.name}
                      className={`specialist-card cursor-pointer ${
                        isSelected ? 'specialist-card--active' : ''
                      }`}
                      onClick={() => handleDoctorSelect(doctor)}
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
                        <p className="text-black font-medium mt-1">
                          Următoarea disponibilitate: <br />
                          <span className="font-semibold">
                            {formatDate(doctor.nextAvailableDate)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
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
                // Show chosen date, fallback to doctor's nextAvailableDate.
                value={selectedDate || selectedDoctor.nextAvailableDate}
                locale="ro-RO"
                tileDisabled={({ date: tileDate }) => {
                  const docEarliest = new Date(selectedDoctor.nextAvailableDate);
                  docEarliest.setHours(0, 0, 0, 0);
                  const tileMidnight = new Date(tileDate);
                  tileMidnight.setHours(0, 0, 0, 0);
                  return tileMidnight < docEarliest || tileMidnight.getDay() === 0;
                }}
                tileClassName={({ date: tileDate }) => {
                  const docEarliest = new Date(selectedDoctor.nextAvailableDate);
                  docEarliest.setHours(0, 0, 0, 0);
                  const tileMidnight = new Date(tileDate);
                  tileMidnight.setHours(0, 0, 0, 0);
                  if (tileMidnight < docEarliest || tileMidnight.getDay() === 0) {
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
                      className={`hour-button ${
                        selectedHour === hour ? 'hour-button--active' : ''
                      }`}
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
                  className="submit-button mt-10 self-start"
                >
                  Programează-mă
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-[#B1D6FF] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-12 w-[400px] sm:w-[500px] rounded-2xl shadow-2xl text-center space-y-6">
            {userRole === 'doctor' ? (
              <>
                <h2 className="text-2xl font-bold text-black">
                  Pacient programat cu succes!
                </h2>
                <button
                  onClick={() => router.push('/Components/Doctors/booking')}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700"
                >
                  Ok
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-black">Confirmat!</h2>
                <p className="text-lg text-black">
                  Programare efectuată pentru <br />
                  <strong className="text-xl">
                    {selectedDate ? selectedDate.toLocaleDateString() : ''}
                  </strong>{' '}
                  la <strong className="text-xl">{selectedHour}</strong>
                </p>
                <button
                  onClick={() => router.push('/Components/Appointments')}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700"
                >
                  Programările mele
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingPage;
