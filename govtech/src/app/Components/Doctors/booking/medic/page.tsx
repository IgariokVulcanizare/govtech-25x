'use client';

import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { useRouter } from 'next/navigation';
import 'react-calendar/dist/Calendar.css';
import './custom-calendar.css';

/** Return the earliest day (starting from today) that is not in the past and not Sunday. */
function findFirstAvailableDay(): Date {
  let candidate = new Date();
  candidate.setHours(0, 0, 0, 0); // Start from "today" at midnight
  // If it's Sunday or in the past, move forward until you find a valid day
  while (candidate.getDay() === 0 || isPastDate(candidate)) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
}

/** Check if a given date is in the past (before today). */
function isPastDate(tileDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return tileDate < today;
}

/** Generate random hours for a given date. */
const getRandomHours = (date: Date): string[] => {
  const day = date.getDay();
  if (day === 0) return []; // Sunday - no hours
  const allHours = ['08:00', '09:30', '11:00', '13:00', '14:30', '15:00', '16:00', '16:30'];
  const count = Math.floor(Math.random() * 4) + 2; // between 2 and 5 hours
  const shuffled = allHours.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count).sort(); // Sort ascending
  // If selected date is today, filter out hours that already passed.
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  if (isToday) {
    const now = new Date();
    return selected.filter((hour) => {
      const [h, m] = hour.split(':').map(Number);
      const hourDate = new Date(date);
      hourDate.setHours(h, m, 0, 0);
      return hourDate > now;
    });
  }
  return selected;
};

export default function DoctorScheduleCard() {
  // Initialize the date with the earliest available day.
  const [date, setDate] = useState<Date>(findFirstAvailableDay());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  // Controls the display of the pop-up after clicking "Programează-mă"
  const [showPopup, setShowPopup] = useState(false);
  // Get available hours for the selected date.
  const [availableHours, setAvailableHours] = useState<string[]>(() => getRandomHours(date));
  const router = useRouter();

  // Read user role from localStorage (should be 'doctor' for doctors)
  const [userRole, setUserRole] = useState<string>('');
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    // Recalculate available hours and reset the selected hour whenever "date" changes.
    setAvailableHours(getRandomHours(date));
    setSelectedHour(null);
  }, [date]);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  // When the booking button is clicked, show the popup.
  const handleBooking = () => {
    if (selectedHour) {
      setShowPopup(true);
    }
  };

  // Determine if the currently selected date is Sunday.
  const isSunday = date.getDay() === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="relative bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-12 w-full max-w-7xl">
        {/* Doctor Info */}
        <div className="w-80 flex flex-col items-center gap-4">
          <img
            src="/ionPopescu.jpg"
            alt="Doctor Ion Popescu"
            className="w-full h-64 object-cover rounded-xl"
          />
          <h2 className="text-3xl font-bold text-blue-600">Popescu Ion</h2>
          <p className="text-lg font-medium text-gray-800">Medic de Familie</p>
        </div>

        {/* Calendar + Hours */}
        <div className="flex flex-col lg:flex-row gap-10 w-full text-black">
          {/* Calendar */}
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileDisabled={({ date: tileDate }) => isPastDate(tileDate) || tileDate.getDay() === 0}
            tileClassName={({ date: tileDate }) => {
              if (isPastDate(tileDate) || tileDate.getDay() === 0) {
                return 'text-black pointer-events-none';
              }
              return undefined;
            }}
            className="rounded-xl shadow-md p-4 bg-white"
          />

          {/* Hours */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-black">
              {isSunday
                ? 'Indisponibil (Duminică)'
                : `Ore disponibile pentru ${date.toLocaleDateString()}`}
            </h3>
            {isSunday ? (
              <p className="text-red-500 text-base">Nu sunt programări disponibile.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {availableHours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      selectedHour === hour
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-blue-50'
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            )}

            {/* Booking button moved inside the card */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleBooking}
                disabled={!selectedHour}
                className={`px-6 py-3 text-white font-semibold rounded-xl w-fit z-50 ${
                  selectedHour
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Programează-mă
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 bg-[#B1D6FF] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-12 w-[400px] sm:w-[500px] rounded-2xl shadow-2xl text-center space-y-6">
            {userRole === 'doctor' ? (
              <>
                <h2 className="text-2xl font-bold text-black">Pacient programat cu succes!</h2>
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
                  <strong className="text-xl">{date.toLocaleDateString()}</strong> la{' '}
                  <strong className="text-xl">{selectedHour}</strong>
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
}
