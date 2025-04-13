"use client";

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  ReactNode
} from "react";
import { useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

// -------------------------------
// APPOINTMENT INTERFACE & TYPE DEFS
// -------------------------------
interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  image: string;
  date: string;   // "YYYY-MM-DD" format
  time: string;
  location: string;
  floor: string;
  waitTime: string;
  status: "Iminente" | "Completate" | "Anulate";
  reason?: string;
  nextAvailable?: string;
  details: string;
}

// border colors for appointments
const strokeColors = ["border-l-blue-500"];

// Tabs for filtering
type Tab = "Toate" | "Iminente" | "Completate" | "Anulate";

// We add "concediu" as a separate mode
type ViewMode = "appointments" | "calendar" | "concediu";

// Days of the week row: Monday→Sunday
const daysOfWeek = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];

// -------------------------------
// AnimatedCard using Framer Motion
// -------------------------------
function AnimatedCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // triggers true if 50% of item is visible in scroll area
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      style={{ marginBottom: "1rem" }}
    >
      {children}
    </motion.div>
  );
}

// -------------------------------
// Helper for date logic
// -------------------------------

// Zero-pad function e.g. 2025-04-07
function padZero(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

// Return a "YYYY-MM-DD" string from a Date
function toYYYYMMDD(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${padZero(m)}-${padZero(d)}`;
}

// Parse "YYYY-MM-DD" into a Date
function parseYYYYMMDD(str: string) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d); // month is 0-based
}

// Generate an array of 42 cells (6 weeks x 7 days) for the given year & month
// Returns objects with { date: Date; inCurrentMonth: boolean }
function generateCalendarDays(year: number, month: number): { date: Date; inCurrentMonth: boolean }[] {
  const result: { date: Date; inCurrentMonth: boolean }[] = [];

  // Start of this month
  const firstOfMonth = new Date(year, month, 1);
  // Monday-based index. In JS, getDay()=0 => Sunday, 1=>Monday, etc.
  // We'll shift so Monday=0, Tuesday=1... Sunday=6
  const dayOfWeek = (firstOfMonth.getDay() + 6) % 7;
  // dayOfWeek tells how many days from Monday

  // We want the first cell to be Monday of the first row
  // => subtract dayOfWeek from firstOfMonth
  const startDate = new Date(firstOfMonth);
  startDate.setDate(startDate.getDate() - dayOfWeek);

  for (let i = 0; i < 42; i++) {
    const temp = new Date(startDate);
    temp.setDate(startDate.getDate() + i);
    // Are we in the current month?
    const inCurrentMonth = temp.getMonth() === month && temp.getFullYear() === year;
    result.push({ date: temp, inCurrentMonth });
  }
  return result;
}

export default function SchedulingPage() {
  const router = useRouter();

  // Current time display
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle among the 3 views: appointments, calendar, or concediu
  const [viewMode, setViewMode] = useState<ViewMode>("appointments");

  // EXAMPLE: appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctorName: "Dna. Popescu Andreea",
      doctorSpecialty: "Cardiologie",
      image: "doctor_asistent.jpg",
      date: "2025-04-15",
      time: "10:30",
      location: "304",
      floor: "Etaj 3",
      waitTime: "~15 min",
      status: "Iminente",
      nextAvailable: "20 Apr",
      details: "Consult anual la inimă",
    },
    {
      id: 2,
      doctorName: "D. Ionescu Mihai",
      doctorSpecialty: "Pediatrie",
      image: "doctor_asistent.jpg",
      date: "2025-04-17",
      time: "14:00",
      location: "205",
      floor: "Etaj 2",
      waitTime: "~5 min",
      status: "Iminente",
      nextAvailable: "25 Apr",
      details: "Verificare tuse copil",
    },
    {
      id: 3,
      doctorName: "Dna. Georgescu Elena",
      doctorSpecialty: "Internistă",
      image: "doctor_asistent.jpg",
      date: "2025-04-10",
      time: "09:00",
      location: "210",
      floor: "Etaj 2",
      waitTime: "~20 min",
      status: "Completate",
      details: "Analize de rutină",
    },
    {
      id: 4,
      doctorName: "D. Anton Cosmin",
      doctorSpecialty: "Medicină generală",
      image: "doctor_asistent.jpg",
      date: "2025-04-05",
      time: "11:30",
      location: "320",
      floor: "Etaj 3",
      waitTime: "~25 min",
      status: "Anulate",
      reason: "Pacientul nu s-a prezentat",
      details: "Control de rutină",
    },
    {
      id: 5,
      doctorName: "Dna. Tudorache Maria",
      doctorSpecialty: "Dermatologie",
      image: "doctor_asistent.jpg",
      date: "2025-05-01",
      time: "09:00",
      location: "402",
      floor: "Etaj 4",
      waitTime: "~10 min",
      status: "Iminente",
      details: "Verificare alunițe",
    },
    {
      id: 6,
      doctorName: "D. Popa Cristian",
      doctorSpecialty: "Neurologie",
      image: "doctor_asistent.jpg",
      date: "2025-05-03",
      time: "13:30",
      location: "306",
      floor: "Etaj 3",
      waitTime: "~15 min",
      status: "Iminente",
      details: "Dureri de cap frecvente",
    },
  ]);

  // Appointment filtering
  const [selectedTab, setSelectedTab] = useState<Tab>("Toate");

  // If "selectedCalendarDate" is set, we only show appointments from that date (in "appointments" view).
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Filter appointments based on tab + optional selected date
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      // If status tab is not "Toate", filter by status
      if (selectedTab !== "Toate" && appt.status !== selectedTab) {
        return false;
      }
      // If a calendar date is selected, only show that date
      if (selectedCalendarDate) {
        return appt.date === selectedCalendarDate;
      }
      return true;
    });
  }, [appointments, selectedTab, selectedCalendarDate]);

  // border color assignment
  const appointmentStrokeColors = useMemo(() => {
    const colorMap: { [key: number]: string } = {};
    appointments.forEach((appt) => {
      colorMap[appt.id] =
        strokeColors[Math.floor(Math.random() * strokeColors.length)];
    });
    return colorMap;
  }, [appointments]);

  // Cancel button
  const handleCancel = (id: number) => {
    const reason = prompt(
      "Vă rugăm să specificați motivul pentru care anulați programarea:"
    );
    if (reason) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "Anulate", reason }
            : item
        )
      );
    }
  };

  // ------------------------------------------
  // CONCEDIU: user can select up to 7 days
  // We'll store them as "YYYY-MM-DD" strings
  // ------------------------------------------
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Instead of toggle, we only "add" if it's not in array (once it's grey, no more click).
  function addConcediuDay(dateStr: string) {
    if (selectedDays.length >= 7) {
      alert("Puteți selecta maxim 7 zile de concediu!");
      return;
    }
    setSelectedDays((prev) => [...prev, dateStr]);
  }

  // ------------------------------------------
  // REAL CALENDAR: navigable months
  // ------------------------------------------
  const now = new Date();
  const [calendarYear, setCalendarYear] = useState(now.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(now.getMonth()); // 0-based

  const calendarDays = useMemo(() => {
    return generateCalendarDays(calendarYear, calendarMonth);
  }, [calendarYear, calendarMonth]);

  function goPrevMonth() {
    if (calendarMonth === 0) {
      setCalendarYear((y) => y - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  }
  function goNextMonth() {
    if (calendarMonth === 11) {
      setCalendarYear((y) => y + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  }

  // Sunday check
  function isSunday(date: Date) {
    return date.getDay() === 0; // 0=Sunday
  }
  // Past day check
  function isPast(date: Date) {
    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);
    return date < startOfToday;
  }

  // For the UI label in the calendar header (e.g. "Aprilie 2025")
  const monthsRO = [
    "Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie",
    "Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"
  ];
  const calendarTitle = `${monthsRO[calendarMonth]} ${calendarYear}`;

  // The user requested: "fa sa nu pot apasa pe casutele sure deloc" => 
  // We'll define grey if: Sunday, Past day, or (Concediu=already selected).
  function isGrey(date: Date): boolean {
    const dateStr = toYYYYMMDD(date);
    return isSunday(date) || isPast(date) || selectedDays.includes(dateStr);
  }

  // On day click in "calendar" view
  function handleCalendarDayClick(cellDate: Date, isGreyCell: boolean, inCurrentMonth: boolean) {
    // If cell is grey or not in this month, do nothing
    if (isGreyCell || !inCurrentMonth) return;

    // Otherwise, jump to appointments for that date
    setSelectedCalendarDate(toYYYYMMDD(cellDate));
    setViewMode("appointments");
  }

  // On day click in "concediu" view
  function handleConcediuDayClick(cellDate: Date, isGreyCell: boolean, inCurrentMonth: boolean) {
    // If cell is grey or not in this month, do nothing
    if (isGreyCell || !inCurrentMonth) return;

    // Otherwise, add to selectedDays
    addConcediuDay(toYYYYMMDD(cellDate));
  }

  // If user clicks "Programări" in sidebar, show all appointments
  function showAllAppointments() {
    setViewMode("appointments");
    setSelectedCalendarDate(null); // reset date filter
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* TOP HEADER */}
      <div className="w-[97%] p-4 bg-white rounded-xl shadow mb-8 mx-5 mt-2">
        <div className="flex items-center justify-between">
          <div className="ml-7">
            <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 font-medium">
              {currentTime.toLocaleTimeString("ro-RO")}
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-4">
              Programează
            </button>
            <button className="w-12 h-12">
              <img
                src="/doctor_asistent.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR + CONTENT */}
      <div className="flex flex-1 gap-4">
        {/* SIDEBAR */}
        <div
          className="w-64 bg-white shadow-2xl p-4 mt-20 mb-8 ml-5 rounded-xl hidden md:flex flex-col"
          style={{ height: "700px" }}
        >
          <div className="flex flex-col flex-1 items-center space-y-4 mt-2">
            {/* Programari */}
            <button
              className={`w-4/5 py-2 rounded-md ${
                viewMode === "appointments"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 border border-blue-600"
              }`}
              onClick={showAllAppointments}
            >
              Programări
            </button>
            {/* Calendar */}
            <button
              className={`w-4/5 py-2 rounded-md ${
                viewMode === "calendar"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 border border-blue-600"
              }`}
              onClick={() => setViewMode("calendar")}
            >
              Calendar
            </button>
          </div>

          {/* Concediu button pinned to bottom, visible only if in "calendar" mode */}
          {viewMode === "calendar" && (
            <div className="mt-auto flex justify-center">
              <button
                className="w-4/5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white mb-2"
                onClick={() => setViewMode("concediu")}
              >
                Concediu
              </button>
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        {viewMode === "appointments" && (
          // ---------------------
          // APPOINTMENTS VIEW
          // ---------------------
          <div className="flex-1 flex flex-col p-4 md:p-8 relative mt-12">
            {/* TABS */}
            <div className="flex items-center gap-3 mb-6 ml-8">
              {(["Toate", "Iminente", "Completate", "Anulate"] as Tab[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedTab === tab
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-600"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* SCROLLABLE list of appointments */}
            <div className="max-h-[550px] overflow-y-auto pr-2">
              <div className="flex flex-col gap-6">
                {filteredAppointments.length === 0 && (
                  <div className="text-gray-600 font-medium">
                    Nu există programări în această categorie (sau dată).
                  </div>
                )}

                {filteredAppointments.map((appt, index) => {
                  const randomColorClass = appointmentStrokeColors[appt.id];
                  return (
                    <AnimatedCard key={appt.id} index={index}>
                      <div
                        className={`relative bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col gap-4 ${randomColorClass} border-l-8`}
                      >
                        {/* Status indicator */}
                        <div className="absolute top-4 right-6 flex items-center gap-2 text-sm font-medium text-gray-800">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              appt.status === "Iminente"
                                ? "bg-yellow-400"
                                : appt.status === "Completate"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span>
                            {appt.status === "Iminente" && "Iminent"}
                            {appt.status === "Completate" && "Finalizat"}
                            {appt.status === "Anulate" && "Anulat"}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row w-full justify-between items-start gap-4 px-4 pt-4">
                          {/* DOCTOR INFO */}
                          <div className="flex items-start gap-4">
                            <div className="w-[150px] h-[150px]">
                              <img
                                src={"/" + appt.image}
                                alt={appt.doctorName}
                                className="object-cover w-full h-full rounded-md"
                              />
                            </div>
                            <div>
                              <h2 className="text-2xl font-semibold text-gray-800">
                                {appt.doctorName}
                              </h2>
                              <p className="text-xl text-gray-500">
                                {appt.doctorSpecialty}
                              </p>
                            </div>
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="mb-4 md:mb-0 md:mr-4 flex gap-2 self-end">
                            <button
                              className="px-3 py-2 bg-white text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50"
                              onClick={() => alert("Funcționalitate Reprogramează")}
                            >
                              Reprogramează
                            </button>
                            {appt.status !== "Anulate" &&
                              appt.status !== "Completate" && (
                                <button
                                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                  onClick={() => handleCancel(appt.id)}
                                >
                                  Anulează
                                </button>
                              )}
                          </div>
                        </div>

                        {/* APPOINTMENT SUMMARY */}
                        <div className="mt-2 border-t pt-4 pb-4 bg-gray-50 px-4 rounded-b-3xl text-gray-600">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Time Info */}
                            <div className="flex items-center">
                              <FaRegClock className="mr-2 text-gray-500" />
                              <div>
                                <p className="font-semibold text-gray-800">
                                  Programare
                                </p>
                                <p className="text-sm">
                                  {appt.time} - {appt.date}
                                </p>
                              </div>
                            </div>
                            {/* Details */}
                            <div>
                              <p className="font-semibold text-gray-800">
                                Detalii
                              </p>
                              <p className="text-sm">{appt.details}</p>
                              {appt.status === "Anulate" && appt.reason && (
                                <p className="text-red-500 text-sm mt-1">
                                  Motiv anulare: {appt.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {viewMode === "calendar" && (
          // ---------------------
          // CALENDAR VIEW
          // ---------------------
          <div
            className="flex-1 p-4 md:p-8 rounded-xl relative mt-12 bg-white flex flex-col"
            style={{ height: "700px" }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goPrevMonth}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                &lt; Luna precedentă
              </button>
              <h2 className="text-black text-2xl font-semibold">
                {calendarTitle}
              </h2>
              <button
                onClick={goNextMonth}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Luna următoare &gt;
              </button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 mt-6 text-center font-semibold">
              {daysOfWeek.map((dow) => (
                <div key={dow} className="p-2 text-gray-700">
                  {dow}
                </div>
              ))}
            </div>

            {/* The 6 rows x 7 columns (42 cells) */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 mt-1 flex-1">
              {calendarDays.map(({ date, inCurrentMonth }, idx) => {
                const dateStr = toYYYYMMDD(date);
                const grey = isGrey(date);
                const dayNum = date.getDate();

                return (
                  <div
                    key={idx}
                    // if grey or not in currentMonth => no click
                    onClick={() => handleCalendarDayClick(date, grey, inCurrentMonth)}
                    className={`border rounded p-2 flex flex-col items-center justify-center text-sm 
                      ${
                        grey
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 text-gray-900 cursor-pointer"
                      }
                      ${
                        !inCurrentMonth ? "opacity-50" : ""
                      }
                    `}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === "concediu" && (
          // ---------------------
          // CONCEDIU VIEW
          // ---------------------
          <div
            className="flex-1 p-4 md:p-8 rounded-xl relative mt-12 bg-white flex flex-col"
            style={{ height: "700px" }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goPrevMonth}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                &lt; Luna precedentă
              </button>
              <h2 className="text-black text-2xl font-semibold">
                Concediu: {calendarTitle}
              </h2>
              <button
                onClick={goNextMonth}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Luna următoare &gt;
              </button>
            </div>
            <p className="text-gray-700 mb-4 mt-2">
              Selectați zilele dorite (maxim 7). Vor fi colorate automat în gri
              și nu mai pot fi deselectate.
            </p>

            {/* Days of week header */}
            <div className="grid grid-cols-7 mt-2 text-center font-semibold">
              {daysOfWeek.map((dow) => (
                <div key={dow} className="p-2 text-gray-700">
                  {dow}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-1 mt-2">
              {calendarDays.map(({ date, inCurrentMonth }, idx) => {
                const dateStr = toYYYYMMDD(date);
                const grey = isGrey(date);
                const dayNum = date.getDate();

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      // if grey or not in month => do nothing
                      if (!grey && inCurrentMonth) {
                        addConcediuDay(dateStr);
                      }
                    }}
                    className={`border rounded p-2 flex flex-col items-center justify-center text-sm 
                      ${
                        grey
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 text-gray-900 cursor-pointer"
                      }
                      ${
                        !inCurrentMonth ? "opacity-50" : ""
                      }
                    `}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <button
                onClick={() =>
                  alert(
                    `Ați selectat următoarele zile: ${selectedDays.join(", ")}`
                  )
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirmă Concediu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
