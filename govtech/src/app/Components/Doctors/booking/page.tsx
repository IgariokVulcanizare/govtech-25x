import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import logo from '../../../../../public/logo.jpg'; // Adjust the path to where your logo is stored

export default function AppointmentsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md">
        {/* Logo / Brand */}
        <div className="px-6 py-4 border-b border-gray-200">
        <img src="/logo.jpg" alt="EasyMed Logo" className="h-10" />

        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-6 py-4 space-y-2">
          <a
            href="#"
            className="block py-2 px-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Programări
          </a>
          <a
            href="#"
            className="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Calendar
          </a>
        </nav>
      </aside>

      {/* Mobile Header (optional) */}
      <div className="md:hidden bg-white w-full flex items-center justify-between px-4 py-2 shadow">
        <div className="flex items-center space-x-2">
          <button>
            <FaBars size={20} />
          </button>
          {/* Replace text logo with an image in mobile header if needed */}
          <img src="/logo.jpg" alt="EasyMed Logo" className="h-10" />
          </div>
        <div>
          <FaUserCircle size={24} className="text-gray-600" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="hidden md:flex justify-between items-center bg-white shadow px-6 py-3">
          <div />
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Programează
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaUserCircle size={28} className="text-gray-500" />
              <span className="font-medium text-gray-700">Hello, Doctor!</span>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <section className="bg-white shadow mt-0 md:mt-4 mx-2 md:mx-6 rounded-md">
          <div className="px-4 py-2 flex items-center space-x-6">
            <button className="text-blue-600 font-semibold border-b-2 border-blue-600 py-2">
              Toate
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Imminente
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Completate
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Anulate
            </button>
          </div>
        </section>

        {/* Appointments List */}
        <main className="flex-1 overflow-y-auto px-2 md:px-6 pt-4 space-y-4">
          {/* Single Appointment Card */}
          <AppointmentCard
            name="Dna. Kushnirenco Ecaterina"
            time="10:30 AM"
            date="2024-02-15"
            problem="Control Medical Anual"
            status="Imminent"
          />
          <AppointmentCard
            name="Dm. Șoimu Ionuț"
            time="10:30 AM"
            date="2024-02-15"
            problem="Dureri în gât"
            status="Imminent"
          />
          <AppointmentCard
            name="Dna. Postica Valeria"
            time="09:00 AM"
            date="2024-02-16"
            problem="Consultație de rutină"
            status="Imminent"
          />
          {/* ... Duplicate or map over your real data */}
        </main>
      </div>
    </div>
  );
}

// A reusable component for an appointment card
interface AppointmentCardProps {
  name: string;
  time: string;
  date: string;
  problem: string;
  status: 'Imminent' | 'Completed' | 'Cancelled' | string;
}

function AppointmentCard({ name, time, date, problem, status }: AppointmentCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-md p-4 flex items-start justify-between">
      <div className="flex flex-col space-y-1">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Appointment: </span>
          {time} - {date}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Problemă: </span>
          {problem}
        </p>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="text-xs inline-block px-3 py-1 rounded-full text-blue-600 bg-blue-100 font-semibold">
          {status}
        </span>
        <div className="flex space-x-2">
          <button className="text-sm text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-md px-3 py-1 transition-colors">
            Reschedule
          </button>
          <button className="text-sm text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-md px-3 py-1 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
