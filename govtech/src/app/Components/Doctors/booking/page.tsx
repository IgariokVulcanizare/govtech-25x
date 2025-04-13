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
  date: string;
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
  const filteredAppointments = appointments.filter((appt) => {
    if (selectedTab === "Toate") return true;
    return appt.status === selectedTab;
  });

  // Random color for left border
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
  // ------------------------------------------
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // Called on day cell click
  const toggleConcediuDay = (dayNum: number) => {
    if (selectedDays.includes(dayNum)) {
      // if day already selected, unselect it
      setSelectedDays((prev) => prev.filter((d) => d !== dayNum));
    } else {
      // if not selected, add it (only if < 7)
      if (selectedDays.length >= 7) {
        alert("Puteți selecta maxim 7 zile de concediu!");
        return;
      }
      setSelectedDays((prev) => [...prev, dayNum]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* TOP HEADER - no extra bottom margin */}
      <div className="w-[97%] p-4 bg-white rounded-xl shadow mb-0 mx-5 mt-0">
        <div className="flex items-center justify-between">
          <div className="ml-7">
            <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            {/* optional time display */}
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
        {/* SIDEBAR - removed mt-20 */}
        <div
          className="w-64 bg-white shadow-2xl p-4 mb-8 ml-5 rounded-xl hidden md:flex flex-col"
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
              onClick={() => setViewMode("appointments")}
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

        {/* MAIN CONTENT - removed mt-12 */}
        {viewMode === "appointments" && (
          // ---------------------
          // APPOINTMENTS VIEW
          // ---------------------
          <div className="flex-1 flex flex-col p-4 md:p-8 relative mt-0">
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
                    Nu există programări în această categorie.
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
            className="flex-1 p-4 md:p-8 rounded-xl relative mt-0 bg-white flex flex-col"
            style={{ height: "700px" }}
          >
            <h2 className="text-black text-2xl font-semibold">Aprilie 2025</h2>

            {/* Basic placeholder calendar (42 cells: 6x7) */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 mt-6 flex-1">
              {Array.from({ length: 42 }).map((_, idx) => {
                const dayNum = idx + 1;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded p-3 flex flex-col items-center justify-center text-sm"
                  >
                    {dayNum <= 30 ? (
                      <>
                        <div className="font-bold">{dayNum}</div>
                        {dayNum === 1 && (
                          <div className="text-xs text-blue-700 mt-2">
                            Consult
                          </div>
                        )}
                        {dayNum === 5 && (
                          <div className="text-xs text-blue-700 mt-2">
                            Analize
                          </div>
                        )}
                        {dayNum === 10 && (
                          <div className="text-xs text-green-700 mt-2">
                            Control
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
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
            className="flex-1 p-4 md:p-8 rounded-xl relative mt-0 bg-white flex flex-col"
            style={{ height: "700px" }}
          >
            <h2 className="text-black text-2xl font-semibold mb-2">
              Concediu
            </h2>
            <p className="text-gray-700 mb-4">
              Selectați zilele dorite (maxim 7).
            </p>

            <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-1">
              {Array.from({ length: 42 }).map((_, idx) => {
                const dayNum = idx + 1;
                const isWithinMonth = dayNum <= 30; // Example: 30-day month

                // highlight if day is selected
                const isSelected = selectedDays.includes(dayNum);

                return (
                  <div
                    key={idx}
                    onClick={() => isWithinMonth && toggleConcediuDay(dayNum)}
                    className={`border rounded p-3 flex flex-col items-center justify-center text-sm cursor-pointer
                      ${
                        isWithinMonth
                          ? `border-gray-200 hover:bg-gray-100 ${
                              isSelected
                                ? "bg-blue-200 border-blue-400"
                                : "bg-white"
                            }`
                          : "bg-gray-50 text-gray-300"
                      }
                    `}
                  >
                    {isWithinMonth ? (
                      <>
                        <div className="font-bold">{dayNum}</div>
                        {isSelected && (
                          <div className="text-xs text-blue-700 mt-1 font-semibold">
                            Selectat
                          </div>
                        )}
                      </>
                    ) : (
                      <span>—</span>
                    )}
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
