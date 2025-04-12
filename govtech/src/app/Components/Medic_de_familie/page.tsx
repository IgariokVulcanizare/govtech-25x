'use client';

import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './custom-calendar.css';

const getRandomHours = (date: Date): string[] => {
    const day = date.getDay();
    if (day === 0) return []; // Sunday - no hours
  
    const allHours = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '16:30', '15:00'];
    const count = Math.floor(Math.random() * 4) + 2;
    const shuffled = allHours.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).sort(); // Sort ascending
  
    // Filter if it's today: remove hours that already passed
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
  const [date, setDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [availableHours, setAvailableHours] = useState<string[]>(getRandomHours(new Date()));

  useEffect(() => {
    setAvailableHours(getRandomHours(date));
    setSelectedHour(null);
  }, [date]);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  const handleBooking = () => {
    if (selectedHour) {
      setShowPopup(true);
    }
  };

  const isSunday = date.getDay() === 0;

  const isPastDate = (tileDate: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tileDate < today;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col lg:flex-row gap-12 w-full max-w-7xl">
        {/* Doctor Info */}
        <div className="w-80 flex flex-col items-center gap-4">
          <img
            src="/adelinadoc.jpg"
            alt="Doctor Adelina"
            className="w-full h-64 object-cover rounded-xl"
          />
          <h2 className="text-2xl font-bold text-blue-600">Temciuc Adelina</h2>
          <p className="text-lg font-medium text-gray-800">Medic de Familie</p>
        </div>

        {/* Calendar + Hours */}
        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {/* Calendar */}
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileDisabled={({ date }) => isPastDate(date) || date.getDay() === 0}
            tileClassName={({ date }) => {
              if (isPastDate(date) || date.getDay() === 0) {
                return 'text-gray-400 pointer-events-none';
              }
              return undefined;
            }}
            
            className="rounded-xl shadow-md p-4 bg-white"
          />

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {isSunday
                ? 'Indisponibil (Duminică)'
                : `Ore disponibile pentru ${date.toLocaleDateString()}`}
            </h3>

            {isSunday ? (
              <p className="text-red-500">Nu sunt programări disponibile.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {availableHours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`px-4 py-2 rounded-lg border transition 
                      ${selectedHour === hour
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-blue-50'}
                    `}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={!selectedHour}
              className={`mt-4 px-6 py-3 text-white font-semibold rounded-xl w-fit
                ${selectedHour ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
              `}
            >
              Programare
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Pop-up */}
      {showPopup && (
  <div className="fixed inset-0 bg-[#B1D6FF] bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-12 w-[400px] sm:w-[500px] rounded-2xl shadow-2xl text-center space-y-6">
      <h2 className="text-2xl font-bold text-black-600">Confirmat!</h2>
      <p className="text-lg text-gray-700">
        Programare efectuată pentru <br />
        <strong className="text-xl">{date.toLocaleDateString()}</strong> la{' '}
        <strong className="text-xl">{selectedHour}</strong>
      </p>
      <button
        onClick={() => setShowPopup(false)}
        className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700"
      >
        Închide
      </button>
    </div>
  </div>
)}
    </div>
  );
}
