'use client';

import { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SchedulingPage.css';
// Import icons from react-icons
import { FaRegClock } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  image: string;
  date: string;
  time: string;
  location: string;
  floor: string;
  waitTime: string;
  status: 'Imminente' | 'Completate' | 'Anulate';
  reason?: string;
  nextAvailable?: string;
  details: string;
}

const strokeColors = ['border-l-blue-500'];

type Tab = 'Toate' | 'Imminente' | 'Completate' | 'Anulate';

export default function AppointmentsPage() {
  const router = useRouter();

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Programări exemplu
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctorName: 'Dr. Tacu Igor',
      doctorSpecialty: 'Cardiolog',
      image: 'igariok.jpg',
      date: '2024-02-15',
      time: '10:30',
      location: '304',
      floor: 'Etaj 3',
      waitTime: '~15 min',
      status: 'Imminente',
      nextAvailable: '20 feb',
      details: 'Consultatie cardiologie'
    },
    {
      id: 2,
      doctorName: 'Dr. Toderiță Loredana',
      doctorSpecialty: 'Asistentă cardiologie',
      image: 'lori.jpg',
      date: '2024-02-18',
      time: '14:00',
      location: '205',
      floor: 'Etaj 2',
      waitTime: '~5 min',
      status: 'Imminente',
      nextAvailable: '25 feb',
      details: 'Verificare post-operatorie'
    },
    {
      id: 3,
      doctorName: 'Dr. Pancenco Ina',
      doctorSpecialty: 'Anesteziolog',
      image: 'inadoc.jpg',
      date: '2024-01-20',
      time: '09:00',
      location: '210',
      floor: 'Etaj 2',
      waitTime: '~20 min',
      status: 'Completate',
      details: 'Anestezie ușoară pentru investigație'
    },
    {
      id: 4,
      doctorName: 'Dr. Rusnac Nichita',
      doctorSpecialty: 'Terapeut',
      image: 'nichitadoc.jpg',
      date: '2024-02-25',
      time: '11:30',
      location: '320',
      floor: 'Etaj 3',
      waitTime: '~25 min',
      status: 'Anulate',
      reason: 'Pacientul a fost răcit',
      details: 'Control de rutină'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<Tab>('Toate');
  // State pentru modal; când este non-null, modalul este afișat
  const [modalAppointment, setModalAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter((appt) => {
    if (selectedTab === 'Toate') return true;
    return appt.status === selectedTab;
  });

  // Mapping pentru culoarea stângă (rămâne stabilă până la reîncărcare)
  const appointmentStrokeColors = useMemo(() => {
    const colorMap: { [key: number]: string } = {};
    appointments.forEach((appt) => {
      colorMap[appt.id] =
        strokeColors[Math.floor(Math.random() * strokeColors.length)];
    });
    return colorMap;
  }, [appointments]);

  const handleCancel = (id: number) => {
    const reason = prompt('Vă rugăm să specificați motivul pentru care anulați programarea:');
    if (reason) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'Anulate', reason } : item
        )
      );
    }
  };

  const openModal = (appt: Appointment) => {
    setModalAppointment(appt);
  };

  const closeModal = () => {
    setModalAppointment(null);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ro-RO', { hour12: false });

  return (
    <div className="p-4 md:p-8 font-sans bg-[#F9FAFB] min-h-screen relative">
      {/* Header */}
      <div className="relative mb-6">
        <h1 className="w-full text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Programările Mele
        </h1>
        <div className="absolute top-0 right-0 flex items-center gap-4">
          {/* Ceas cu icon și border */}
          <div className="flex items-center border border-gray-300 rounded-xl shadow-sm p-3 text-md">
            <FaRegClock className="mr-1 text-gray-700 mr-2" />
            <span className="text-gray-700 font-bold">{formatTime(currentTime)}</span>
          </div>
          <button
            onClick={() => router.push('/Components/SelectareMedic')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-3 rounded-md font-semibold"
          >
            Programare Nouă
          </button>
        </div>
      </div>

      <p className="mb-6 text-gray-600 text-center">
        Urmărește-ți viitoarele și anterioarele vizite medicale.
      </p>

      {/* Taburi */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {(['Toate', 'Imminente', 'Completate', 'Anulate'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md border ${selectedTab === tab
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-600'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carduri de programări în grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAppointments.length === 0 && (
          <div className="text-gray-600 font-medium">
            Nu există programări în această categorie.
          </div>
        )}
        {filteredAppointments.map((appt) => {
          const randomColorClass = appointmentStrokeColors[appt.id];
          return (
            // Fiecare card
            <div
              key={appt.id}
              className={`appointment-card self-start relative bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col gap-4 ${randomColorClass} border-l-8`}
            >
              {/* Indicator Status */}
              <div className="absolute top-8 right-6 flex items-center gap-2 text-sm font-medium text-gray-800">
                <span
                  className={`w-3 h-3 rounded-full ${appt.status === 'Imminente'
                      ? 'bg-yellow-400'
                      : appt.status === 'Completate'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                ></span>
                <span>
                  {appt.status === 'Imminente' && 'Imminent'}
                  {appt.status === 'Completate' && 'Finalizat'}
                  {appt.status === 'Anulate' && 'Anulat'}
                </span>
              </div>

              <div className="flex flex-col md:flex-row w-full justify-between items-start gap-4">
                {/* Stânga: Avatarul medicului + informații */}
                <div className="flex items-start gap-4">
                  <div
                    className={`doctor-avatar w-[150px] h-[150px] ${(appt.doctorName === 'Dr. Tacu Igor' ||
                        appt.doctorName === 'Dr. Toderiță Loredana') && 'mt-5'
                      }`}
                  >
                    <img
                      src={'/' + appt.image}
                      alt={appt.doctorName}
                      className="object-cover w-full h-full rounded-md" // Rectangular cu margini rotunjite
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{appt.doctorName}</h2>
                    <p className="text-xl text-gray-500">{appt.doctorSpecialty}</p>
                  </div>
                </div>

                {/* Dreapta: Butoane de acțiune */}
                <div className="absolute bottom-0 right-0 mr-[30px] mb-[20px] flex flex-row gap-2">
                  <button
                    className="action-button-white"
                    onClick={() => openModal(appt)}
                  >
                    Detalii
                  </button>
                  <button
                    className="action-button-white"
                    onClick={() => alert('Funcționalitate de reprogramează')}
                  >
                    Reprogramează
                  </button>
                  {appt.status !== 'Anulate' && appt.status !== 'Completate' && (
                    <button
                      className="action-button-cancel"
                      onClick={() => handleCancel(appt.id)}
                    >
                      Anulează
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal cu efect de blur (doar în modal, fotografia rămâne circulară) */}
      {modalAppointment && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl shadow-xl p-6 w-11/12 md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Buton de închidere */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <AiOutlineClose size={24} />
            </button>

            {/* Fotografia medicului în modal - de data aceasta circulară */}
            <div className="flex justify-center mb-4">
              <img
                src={'/' + modalAppointment.image}
                alt={modalAppointment.doctorName}
                className="w-48 h-48 rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {modalAppointment.doctorName}
            </h2>

            {/* Detaliile extinse */}
            <div className="mt-4 border-t pt-4 bg-gray-50 pb-8 pl-6 rounded-md text-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Informații Programare */}
                <div className="flex items-center">
                  <FaRegClock className="mr-2 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Programare</p>
                    <p className="text-sm">
                      {modalAppointment.time} - {modalAppointment.date}
                    </p>
                  </div>
                </div>
                {/* Informații Locație */}
                <div className="flex items-center">
                  <IoLocationOutline className="mr-2 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Locație</p>
                    <p className="text-sm">
                      {modalAppointment.location}, {modalAppointment.floor}
                    </p>
                  </div>
                </div>
                {/* Informații Timp de așteptare */}
                <div className="flex items-center">
                  <FaRegClock className="mr-2 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Timp de așteptare</p>
                    <p className="text-sm">{modalAppointment.waitTime}</p>
                  </div>
                </div>
              </div>
              {modalAppointment.nextAvailable && (
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">Următor disponibil:</p>
                  <p className="text-sm">{modalAppointment.nextAvailable}</p>
                </div>
              )}
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Detalii:</p>
                <p className="text-sm">{modalAppointment.details}</p>
                {modalAppointment.status === 'Anulate' &&
                  modalAppointment.reason && (
                    <p className="text-red-500 text-sm mt-1">
                      Motiv anulare: {modalAppointment.reason}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
