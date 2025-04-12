'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SchedulingPage.css';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

const SchedulingPage = () => {
  // List of cities
  const cities = [
    'Chișinău',
    'Bălți',
    'Cahul',
    'Orhei',
    'Ungheni',
    'Soroca',
    'Comrat'
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
    'Comrat': ['Spitalul Raional Comrat', 'Clinica Comrat']
  };

  // Departments
  const departments = ['Pediatrie', 'Cardiologie', 'Dermatologie', 'Ortopedie'];

  // Doctor details per department with image files in the public folder.
  const doctorDetailsByDepartment: { [key: string]: Doctor[] } = {
    Pediatrie: [
      {
        name: 'Dr. Tacu Igor',
        specialty: 'Chirurg pediatru',
        image: 'igordoc.jpg'
      },
      {
        name: 'Dr. Toderiță Loredana',
        specialty: 'Asistentă medicală',
        image: 'loredanadoc.jpg'
      },
      {
        name: 'Dr. Pancenco Ina',
        specialty: 'Anesteziolog',
        image: 'inadoc.jpg'
      },
      {
        name: 'Dr. Rusnac Nichita',
        specialty: 'Terapeut',
        image: 'nichitadoc.jpg'
      }
    ],
    Cardiologie: [
      {
        name: 'Dr. Tacu Igor',
        specialty: 'Cardiolog',
        image: 'igordoc.jpg'
      },
      {
        name: 'Dr. Toderiță Loredana',
        specialty: 'Asistentă cardiologie',
        image: 'loredanadoc.jpg'
      },
      {
        name: 'Dr. Pancenco Ina',
        specialty: 'Anesteziolog',
        image: 'inadoc.jpg'
      },
      {
        name: 'Dr. Rusnac Nichita',
        specialty: 'Terapeut',
        image: 'nichitadoc.jpg'
      }
    ],
    Dermatologie: [
      {
        name: 'Dr. Tacu Igor',
        specialty: 'Dermatolog',
        image: 'igordoc.jpg'
      },
      {
        name: 'Dr. Toderiță Loredana',
        specialty: 'Asistentă dermatologie',
        image: 'loredanadoc.jpg'
      },
      {
        name: 'Dr. Pancenco Ina',
        specialty: 'Anesteziolog',
        image: 'inadoc.jpg'
      },
      {
        name: 'Dr. Rusnac Nichita',
        specialty: 'Terapeut',
        image: 'nichitadoc.jpg'
      }
    ],
    Ortopedie: [
      {
        name: 'Dr. Tacu Igor',
        specialty: 'Chirurg ortoped',
        image: 'igordoc.jpg'
      },
      {
        name: 'Dr. Toderiță Loredana',
        specialty: 'Asistentă ortopedie',
        image: 'loredanadoc.jpg'
      },
      {
        name: 'Dr. Pancenco Ina',
        specialty: 'Anesteziolog',
        image: 'inadoc.jpg'
      },
      {
        name: 'Dr. Rusnac Nichita',
        specialty: 'Terapeut',
        image: 'nichitadoc.jpg'
      }
    ]
  };

  // State variables
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState('');

  // Function to get available hours
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

  // Programare button handler
  const handleProgramare = () => {
    alert(`Programare reușită:
    Oraș: ${selectedCity}
    Spital: ${selectedHospital}
    Departament: ${selectedDepartment}
    Medic: ${selectedDoctor?.name}
    Data: ${selectedDate?.toLocaleDateString('ro-RO')}
    Ora: ${selectedHour}`);
  };

  return (
    <div className="p-8 font-sans bg-[#F4F8FF] min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Programare medicală</h1>

      {/* Top selection row: City, Hospital, Department */}
      <div className="flex gap-4 flex-wrap mb-6">
        <select
          className="p-3 w-56 rounded-xl border border-gray-300"
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

        <select
          className="p-3 w-56 rounded-xl border border-gray-300"
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

        <select
          className="p-3 w-56 rounded-xl border border-gray-300"
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

      {/* The big white card container */}
      <div className="bg-white rounded-2xl p-6 shadow-xl transition-all">
        {/* Doctor cards appear when a department is selected */}
        {selectedDepartment && (
          <>
            <h2 className="text-xl font-semibold mb-4">Alege un specialist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {doctorDetailsByDepartment[selectedDepartment]?.map((doctor) => (
                <div
                  key={doctor.name}
                  className={`specialist-card cursor-pointer border hover:border-blue-600 rounded-xl p-3 
                    ${
                      selectedDoctor?.name === doctor.name
                        ? 'border-blue-600'
                        : 'border-gray-200'
                    }
                  `}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setSelectedDate(null);
                    setSelectedHour('');
                  }}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="specialist-image mb-2"
                  />
                  <div className="specialist-info">
                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Calendar and Hour selection appear when a doctor is selected */}
        {selectedDoctor && (
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* LEFT: Calendar with border */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Alege data</h2>
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
                className="rounded-xl border border-gray-300 calendar-container"
              />
            </div>

            {/* RIGHT: Hours and "Programează" button */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Ore disponibile</h2>
              {selectedDate && availableHours.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {availableHours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`px-4 py-2 border rounded-lg text-center
                        ${
                          selectedHour === hour
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-blue-600 border-blue-600'
                        } hover:bg-blue-700 hover:text-white`}
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
              {/* "Programează" button displays only when an hour is chosen */}
              {selectedHour && (
                <button
                  onClick={handleProgramare}
                  className="px-6 py-3 mt-auto self-start bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Programează
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
