import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import format from "date-fns/format";
import { isFuture } from "date-fns";
import { workoutService } from "@/services/workoutService";
import { useAuth } from "@/contexts/AuthContext";

export default function CalendarPage() {
  const [daySelected, setDaySelected] = useState(false);
  const [workout, setWorkout] = useState(null);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const { user } = useAuth();

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

  useEffect(() => {
    const fetchWorkout = async () => {
      if (user && date) {
        const workoutData = await workoutService.getWorkout(user.uid, date);
        setWorkout(workoutData);
      }
    };

    fetchWorkout();
  }, [date, user]);

  const handleBack = () => {
    if (daySelected === false) {
      navigate("/");
    } else {
      setDaySelected(false);
      setDate(null);
      setWorkout(null);
    }
  };

  const addSampleWorkout = async () => {
    if (!user) return;

    const sampleDate = new Date(2024, 10, 11); // Month is 0-based, so 10 = November
    const workoutData = {
      type: "Chest Biceps",
      exercises: [
        {
          name: "Incline DB Curls",
          sets: [
            { weight: "9", reps: 18 },
            { weight: "10", reps: 15 },
            { weight: "10", reps: 8 },
            { weight: "10", reps: 7 },
          ],
        },
        {
          name: "Concentration Curls",
          sets: [
            { weight: "12", reps: 11 },
            { weight: "12", reps: 9 },
            { weight: "12", reps: 9 },
          ],
        },
        {
          name: "Bench Press",
          sets: [
            { weight: "20", reps: 16 },
            { weight: "20", reps: 10 },
            { weight: "16", reps: 9 },
          ],
        },
        {
          name: "DB Flyes",
          sets: [
            { weight: "8", reps: 13 },
            { weight: "9", reps: 12 },
            { weight: "9", reps: 12 },
          ],
        },
        {
          name: "Core",
          sets: [
            { weight: "70", reps: 20 },
            { weight: "70", reps: 20 },
            { weight: "70", reps: 20 },
          ],
        },
      ],
    };

    try {
      await workoutService.saveWorkout(user.uid, sampleDate, workoutData);
      alert("Sample workout added for Nov 11, 2024!");

      // If currently viewing that date, update the display
      if (
        date &&
        format(date, "yyyy-MM-dd") === format(sampleDate, "yyyy-MM-dd")
      ) {
        setWorkout(workoutData);
      }
    } catch (error) {
      console.error("Error adding sample workout:", error);
      alert("Error adding sample workout");
    }
  };

  const renderExercise = (exercise) => (
    <div
      key={exercise.name}
      className="m-2 rounded-lg border border-black bg-green-300/20 p-2 text-black shadow-lg"
    >
      <h2 className="font-bold">{exercise.name}</h2>
      <p className="ml-2">
        Weight: {exercise.sets.map((set) => set.weight).join("/")} kg
      </p>
      <p className="ml-2">
        Reps: {exercise.sets.map((set) => set.reps).join(" ")}
      </p>
    </div>
  );

  return (
    <div className="h-screen text-white">
      <div className="flex items-center justify-between bg-slate-600 p-4 text-2xl">
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
      {daySelected === true && workout && (
        <div className="m-3 text-black">
          <h1 className="my-3 text-center">
            {formatDate(date)} - {workout.type}
          </h1>
          {workout.exercises.map(renderExercise)}
        </div>
      )}
      {daySelected === true && !workout && (
        <div className="m-3 text-center text-black">
          <p>No workout found for this date</p>
          <button
            onClick={addSampleWorkout}
            className="my-6 rounded bg-blue-200 px-4 py-2 text-sm hover:bg-green-600"
          >
            Add Sample Workout (Nov 11)
          </button>
        </div>
      )}
    </div>
  );
}
