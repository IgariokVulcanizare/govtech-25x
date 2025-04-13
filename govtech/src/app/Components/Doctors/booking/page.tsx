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

// -------------------------------------------------
// APPOINTMENT INTERFACE & TYPE DEFS
// -------------------------------------------------
interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  image: string;    // e.g. "andreeapopescu.png"
  date: string;     // "YYYY-MM-DD" format
  time: string;
  location: string;
  floor: string;
  waitTime: string;
  status: "Iminente" | "Completate" | "Anulate";
  reason?: string;
  nextAvailable?: string;
  details: string;  // e.g. "Consultare Medicală"
}

// For coloring the left border of Appointment cards
const strokeColors = ["border-l-blue-500"];

// Tabs in "Appointments" view
type Tab = "Toate" | "Iminente" | "Completate" | "Anulate";

// View modes for the page
type ViewMode = "appointments" | "calendar" | "concediu";

// Days of week: Monday → Sunday
const daysOfWeek = [
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
  "Duminică",
];

// -------------------------------------------------
// AnimatedCard using Framer Motion
// -------------------------------------------------
function AnimatedCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // triggers true if 50% of item is visible
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

// -------------------------------------------------
// Helpers for date logic
// -------------------------------------------------
function padZero(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

// Return "YYYY-MM-DD"
function toYYYYMMDD(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${padZero(m)}-${padZero(d)}`;
}

function isSunday(date: Date) {
  return date.getDay() === 0; // Sunday=0
}
function isPast(date: Date) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return date < startOfToday;
}

/**
 * Generate 42 cells (6 weeks x 7 days)
 * for the given year & month, Monday-based
 */
function generateCalendarDays(
  year: number,
  month: number
): { date: Date; inCurrentMonth: boolean }[] {
  const result: { date: Date; inCurrentMonth: boolean }[] = [];
  const firstOfMonth = new Date(year, month, 1);
  // Monday-based offset
  const dayOfWeek = (firstOfMonth.getDay() + 6) % 7;
  const startDate = new Date(firstOfMonth);
  startDate.setDate(startDate.getDate() - dayOfWeek);

  for (let i = 0; i < 42; i++) {
    const temp = new Date(startDate);
    temp.setDate(startDate.getDate() + i);
    result.push({
      date: temp,
      inCurrentMonth: temp.getMonth() === month && temp.getFullYear() === year,
    });
  }
  return result;
}

// -------------------------------------------------
// Color-coded appointments in the calendar day
// -------------------------------------------------
function getColorByDetails(details: string): string {
  switch (details) {
    case "Măsurarea Tensiunii":
      return "bg-blue-100 text-blue-800";
    case "Consultare":
      return "bg-pink-100 text-pink-800";
    case "Consultare Medicală":
      return "bg-yellow-100 text-yellow-800";
    case "Analize":
      return "bg-green-100 text-green-800";
    case "Control":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// -------------------------------------------------
export default function SchedulingPage() {
  const router = useRouter();

  // Current time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Switch among 3 views
  const [viewMode, setViewMode] = useState<ViewMode>("appointments");

  // Example appointments (no Sunday appointments)
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctorName: "Dna. Popescu Andreea",
      doctorSpecialty: "",
      image: "andreeapopescu.png",
      date: "2025-04-14",
      time: "10:30",
      location: "304",
      floor: "Etaj 3",
      waitTime: "~15 min",
      status: "Iminente",
      details: "Consultare Medicală",
    },
    {
      id: 2,
      doctorName: "D. Ionescu Mihai",
      doctorSpecialty: "",
      image: "mihaiionescu.png",
      date: "2025-04-17",
      time: "14:00",
      location: "205",
      floor: "Etaj 2",
      waitTime: "~5 min",
      status: "Iminente",
      details: "Măsurarea Tensiunii",
    },
    {
      id: 3,
      doctorName: "Dna. Georgescu Elena",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-05-01",
      time: "09:30",
      location: "210",
      floor: "Etaj 2",
      waitTime: "~20 min",
      status: "Completate",
      details: "Analize",
    },
    {
      id: 4,
      doctorName: "D. Anton Cosmin",
      doctorSpecialty: "",
      image: "antoncosmin.png",
      date: "2025-05-02",
      time: "11:30",
      location: "320",
      floor: "Etaj 3",
      waitTime: "~25 min",
      status: "Anulate",
      reason: "Pacientul nu s-a prezentat",
      details: "Consultare",
    },
    {
      id: 5,
      doctorName: "Dna. Tudorache Maria",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-05-06",
      time: "09:00",
      location: "402",
      floor: "Etaj 4",
      waitTime: "~10 min",
      status: "Iminente",
      details: "Consultare Medicală",
    },
    {
      id: 6,
      doctorName: "D. Popa Cristian",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-05-08",
      time: "13:30",
      location: "306",
      floor: "Etaj 3",
      waitTime: "~15 min",
      status: "Iminente",
      details: "Control",
    },
    {
      id: 8,
      doctorName: "D. Vasile Laurentiu",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-05-15",
      time: "10:00",
      location: "125",
      floor: "Parter",
      waitTime: "~5 min",
      status: "Iminente",
      details: "Control",
    },
    {
      id: 9,
      doctorName: "Dna. Zaharia Loredana",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-04-25",
      time: "15:30",
      location: "308",
      floor: "Etaj 3",
      waitTime: "~15 min",
      status: "Iminente",
      details: "Măsurarea Tensiunii",
    },
    {
      id: 10,
      doctorName: "D. Georgescu Mihai",
      doctorSpecialty: "",
      image: "doctor_asistent.jpg",
      date: "2025-05-28",
      time: "16:00",
      location: "205",
      floor: "Etaj 2",
      waitTime: "~20 min",
      status: "Iminente",
      details: "Consultare",
    },
  ]);

  // Filter logic for "Appointments" view
  const [selectedTab, setSelectedTab] = useState<Tab>("Toate");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      // Filter by tab
      if (selectedTab !== "Toate" && appt.status !== selectedTab) {
        return false;
      }
      // If user clicked on a day in the calendar
      if (selectedCalendarDate) {
        return appt.date === selectedCalendarDate;
      }
      return true;
    });
  }, [appointments, selectedTab, selectedCalendarDate]);

  // Left border color map
  const appointmentStrokeColors = useMemo(() => {
    const colorMap: { [key: number]: string } = {};
    appointments.forEach((appt) => {
      colorMap[appt.id] =
        strokeColors[Math.floor(Math.random() * strokeColors.length)];
    });
    return colorMap;
  }, [appointments]);

  // Cancel appointment
  function handleCancel(id: number) {
    const reason = prompt("Vă rugăm să specificați motivul pentru care anulați programarea:");
    if (reason) {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "Anulate", reason }
            : item
        )
      );
    }
  }

  // ------------------------------------------
  // Concediu with toggling and confirm
  // ------------------------------------------
  const [finalConcediuDays, setFinalConcediuDays] = useState<string[]>([]);
  const [tempConcediuDays, setTempConcediuDays] = useState<string[]>([]);

  // If user enters Concediu view, copy final -> temp
  useEffect(() => {
    if (viewMode === "concediu") {
      setTempConcediuDays([...finalConcediuDays]);
    }
  }, [viewMode, finalConcediuDays]);

  function confirmConcediu() {
    setFinalConcediuDays([...tempConcediuDays]);
    alert(`Concediu confirmat pentru zilele: ${tempConcediuDays.join(", ")}`);
  }

  function toggleTempDay(dateStr: string) {
    setTempConcediuDays((prev) => {
      if (prev.includes(dateStr)) {
        // unselect
        return prev.filter((d) => d !== dateStr);
      } else {
        if (prev.length >= 7) {
          alert("Puteți selecta maxim 7 zile de concediu!");
          return prev;
        }
        // select
        return [...prev, dateStr];
      }
    });
  }

  // ------------------------------------------
  // Calendar logic
  // ------------------------------------------
  const now = new Date();
  const [calendarYear, setCalendarYear] = useState(now.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(now.getMonth()); // 0-based
  const calendarDays = useMemo(
    () => generateCalendarDays(calendarYear, calendarMonth),
    [calendarYear, calendarMonth]
  );

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

  const monthsRO = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];
  const calendarTitle = `${monthsRO[calendarMonth]} ${calendarYear}`;

  // If user clicks "Programări" in sidebar, reset date filter
  function showAllAppointments() {
    setViewMode("appointments");
    setSelectedCalendarDate(null);
  }

  // For each date, find appointments to show color-coded labels
  function getAppointmentsForDate(date: Date) {
    const dateStr = toYYYYMMDD(date);
    return appointments.filter((appt) => appt.date === dateStr);
  }

  // If we're in normal calendar view, clicking a day => show that day’s appointments
  function handleCalendarDayClick(date: Date, isGrey: boolean, inMonth: boolean) {
    if (isGrey || !inMonth) return;
    setSelectedCalendarDate(toYYYYMMDD(date));
    setViewMode("appointments");
  }

  // If we're in concediu view, clicking a day => toggle
  function handleConcediuDayClick(date: Date, isGrey: boolean, inMonth: boolean) {
    if (!inMonth || isGrey) return;
    toggleTempDay(toYYYYMMDD(date));
  }

  // The day is grey if Sunday, Past, or already in finalConcediuDays
  function isDayGrey(date: Date): boolean {
    const dateStr = toYYYYMMDD(date);
    return (
      isSunday(date) ||
      isPast(date) ||
      finalConcediuDays.includes(dateStr)
    );
  }

  // ------------------------------------------
  // NEW: IDNP modal for "Adauga programare"
  // ------------------------------------------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIdnp, setNewIdnp] = useState("");

  // Handler to confirm the input & go to Components/Altmedic
  function handleAddAppointment() {
    // Here you can do any validation or API call you need with newIdnp
    // For simplicity, just push to the route:
    router.push("../../Components/Altmedic");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* HEADER (minimal spacing) */}
      <div className="w-[97%] p-4 bg-white rounded-xl shadow mb-2 mx-5 mt-0">
        <div className="flex items-center justify-between">
          <div className="ml-7">
            <img src="/logo2.1.svg" alt="Logo" className="h-12 w-auto" />
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
          className="w-64 bg-white shadow-2xl p-4 mb-4 ml-5 rounded-xl hidden md:flex flex-col"
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
          // APPOINTMENTS VIEW
          <div className="flex-1 flex flex-col p-4 md:p-8 relative">
            {/* Tabs for filter */}
            <div className="flex items-center gap-3 mb-4 ml-8">
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
                          {/* Doctor Info */}
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

                          {/* Action Buttons */}
                          <div className="mb-4 md:mb-0 md:mr-4 flex gap-2 self-end">
                            <button
                              className="px-3 py-2 bg-white text-blue-700 border border-blue-700 rounded-md hover:bg-blue-50"
                              onClick={() =>
                                alert("Funcționalitate Reprogramează")
                              }
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

                        {/* Appointment Summary */}
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
          // CALENDAR VIEW
          <div className="flex-1 w-full h-full bg-white p-4 md:p-8 rounded-xl relative flex flex-col">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-2">
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
            <div className="grid grid-cols-7 text-center font-semibold">
              {daysOfWeek.map((dow) => (
                <div key={dow} className="p-2 text-gray-700">
                  {dow}
                </div>
              ))}
            </div>

            {/* 6x7 = 42 day cells */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 w-full h-full">
              {calendarDays.map(({ date, inCurrentMonth }, idx) => {
                const dayNum = date.getDate();
                const dateStr = toYYYYMMDD(date);
                const grey = isSunday(date) || isPast(date) || finalConcediuDays.includes(dateStr);
                const dayAppointments = getAppointmentsForDate(date);

                const labels = dayAppointments.map((appt) => {
                  const c = getColorByDetails(appt.details);
                  return (
                    <div
                      key={appt.id}
                      className={`text-xs px-1 py-0.5 rounded-md mt-1 ${c}`}
                      style={{
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                      }}
                    >
                      {appt.details}
                    </div>
                  );
                });

                return (
                  <div
                    key={idx}
                    onClick={() =>
                      !grey && inCurrentMonth && handleCalendarDayClick(date, grey, inCurrentMonth)
                    }
                    className={`border rounded flex flex-col items-start p-2
                      ${
                        grey
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 text-gray-900 cursor-pointer"
                      }
                      ${!inCurrentMonth ? "opacity-50" : ""}
                    `}
                  >
                    <div className="font-bold">{dayNum}</div>
                    {labels}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === "concediu" && (
          // CONCEDIU VIEW
          <div className="flex-1 w-full h-full bg-white p-4 md:p-8 rounded-xl relative flex flex-col">
            <div className="flex items-center justify-between mb-2">
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
            <p className="text-gray-700 mb-2 mt-1">
              Selectați/deselectați zilele (maxim 7). Se aplică doar după confirmare.
            </p>

            <div className="grid grid-cols-7 text-center font-semibold">
              {daysOfWeek.map((dow) => (
                <div key={dow} className="p-2 text-gray-700">
                  {dow}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6 gap-2 w-full h-full">
              {calendarDays.map(({ date, inCurrentMonth }, idx) => {
                const dayNum = date.getDate();
                const dateStr = toYYYYMMDD(date);
                // Grey if Sunday/past or in finalConcediu
                const grey = isDayGrey(date);
                const inTemp = tempConcediuDays.includes(dateStr);

                const dayAppointments = getAppointmentsForDate(date);
                const labels = dayAppointments.map((appt) => {
                  const c = getColorByDetails(appt.details);
                  return (
                    <div
                      key={appt.id}
                      className={`text-xs px-1 py-0.5 rounded-md mt-1 ${c}`}
                      style={{
                        maxWidth: "100%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden"
                      }}
                    >
                      {appt.details}
                    </div>
                  );
                });

                let cellStyle = "";
                if (!inCurrentMonth) {
                  cellStyle += " opacity-50";
                }
                if (grey) {
                  cellStyle += " bg-gray-200 text-gray-600 cursor-not-allowed";
                } else if (inTemp) {
                  cellStyle += " bg-blue-200 text-blue-900 cursor-pointer";
                } else {
                  cellStyle += " bg-white hover:bg-gray-100 text-gray-900 cursor-pointer";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!inCurrentMonth || grey) return;
                      handleConcediuDayClick(date, grey, inCurrentMonth);
                    }}
                    className={`border rounded flex flex-col items-start p-2 ${cellStyle}`}
                  >
                    <div className="font-bold">{dayNum}</div>
                    {labels}
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <button
                onClick={confirmConcediu}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirmă Concediu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating circular button in lower-left corner */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 mb-7 mr-10 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        Adauga programare
      </button>

      {/* Modal for adding new appointment (IDNP input) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="mb-4 text-xl font-semibold">Introduceți IDNP</h3>
            <input
              type="text"
              value={newIdnp}
              onChange={(e) => setNewIdnp(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full mb-4 rounded-md"
              placeholder="IDNP..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Anulează
              </button>
              <button
                onClick={handleAddAppointment}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirmă
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
