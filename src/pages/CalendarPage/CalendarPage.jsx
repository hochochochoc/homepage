import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import format from "date-fns/format";
import { isFuture } from "date-fns";

export default function CalendarPage() {
  const [daySelected, setDaySelected] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);

  const formatDate = (date) => {
    const day = format(date, "d");
    const month = format(date, "MMM");
    const weekday = format(date, "EEE");
    const year = format(date, "yyyy");
    const currentYear = format(new Date(), "yyyy");

    if (year !== currentYear) {
      return `${month} ${day} ${weekday} ${year}`;
    }
    return `${month} ${day} ${weekday}`;
  };

  const handleBack = () => {
    if (daySelected === false) {
      navigate("/");
    } else {
      setDaySelected(false);
      // Reset date when going back to calendar view
      setDate(null);
    }
  };

  return (
    <div className="h-screen text-white">
      <div className="flex items-center justify-start bg-slate-600 p-4 text-2xl">
        <ArrowLeft onClick={handleBack} />
      </div>
      {daySelected === false && (
        <div className="m-3 flex flex-col space-y-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
                setDaySelected(true);
              }
            }}
            disabled={(date) => isFuture(date)}
            className="rounded-md border"
          />
        </div>
      )}
      {daySelected === true && (
        <div className="m-3 text-black">
          <h1 className="my-3 text-center">
            {formatDate(date)} - Chest Biceps
          </h1>
          <div className="m-1 rounded-lg border border-black bg-green-300 p-2 text-black">
            <h2 className="font-bold">Incline DB Curls</h2>
            <p className="ml-2">Weight: 9/10 kg</p>
            <p className="ml-2">Reps: 18/15 10/8 7/7</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-300 p-2 text-black">
            <h2 className="font-bold">Concentration Curls</h2>
            <p className="ml-2">Weight: 12 kg</p>
            <p className="ml-2">Reps: 11 9 9</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-300 p-2 text-black">
            <h2 className="font-bold">Bench Press</h2>
            <p className="ml-2">Weight: 20/16 kg</p>
            <p className="ml-2">Reps: 20kg: 16 10 16kg: 9</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-300 p-2 text-black">
            <h2 className="font-bold">DB Flyes</h2>
            <p className="ml-2">Weight: 8/9 kg</p>
            <p className="ml-2">Reps: 13/12 12/12 12/12</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-300 p-2 text-black">
            <h2 className="font-bold">Core</h2>
            <p className="ml-2">Weight: 70 kg</p>
            <p className="ml-2">Reps: 20 17:3 15:3:2</p>
          </div>
        </div>
      )}
    </div>
  );
}
