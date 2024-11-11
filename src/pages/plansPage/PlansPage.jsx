import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlansPage() {
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState(null);

  const days = [
    { name: "Monday", type: "Chest Biceps Core" },
    { name: "Tuesday", type: "Legs" },
    { name: "Wednesday", type: "Back Triceps Core" },
    { name: "Thursday", type: "Chest Biceps" },
    { name: "Friday", type: "Shoulders Back Core" },
    { name: "Saturday", type: "Rest" },
    { name: "Sunday", type: "Rest" },
  ];

  const toggleDay = (dayName) => {
    if (openDay === dayName) {
      setOpenDay(null);
    } else {
      setOpenDay(dayName);
    }
  };

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex items-center justify-start bg-slate-500 p-4 text-2xl text-white">
        <ArrowLeft onClick={() => navigate("/")} />
      </div>
      <div className="m-3 flex flex-col space-y-3">
        {days.map((day) => (
          <div
            key={day.name}
            className="rounded-lg border border-black bg-green-300/20 shadow-lg"
          >
            <div
              onClick={() => toggleDay(day.name)}
              className="flex cursor-pointer items-center justify-between p-4"
            >
              <h2 className="font-bold">
                {day.name} - {day.type}
              </h2>
              {openDay === day.name ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {openDay === day.name && (
              <div className="border-t border-gray-200 p-4">
                {/* This is where you'll put the workout details */}
                <p>Workout details for {day.name} will go here</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
