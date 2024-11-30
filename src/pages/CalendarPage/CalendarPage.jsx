import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import format from "date-fns/format";
import { isFuture } from "date-fns";
import { workoutService } from "../../services/workoutService";
import { planService } from "@/services/planService";
import { useAuth } from "../../contexts/AuthContext";

const EditableField = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  const handleSave = () => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onSave(numValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-8 rounded border border-gray-300 px-1 text-center text-black focus:outline-none focus:ring focus:ring-blue-300"
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className="cursor-pointer rounded px-0.5 hover:bg-blue-100"
    >
      {value}
    </span>
  );
};

export default function CalendarPage() {
  const [daySelected, setDaySelected] = useState(false);
  const [workout, setWorkout] = useState(null);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const { user } = useAuth();
  const [displayedMonth, setDisplayedMonth] = useState(new Date());

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

  const addSampleWorkout = async () => {
    if (!user || !date) return;

    try {
      const dayName = format(date, "EEEE");
      const dayPlan = await planService.getPlan(user.uid, dayName);

      if (!dayPlan) {
        alert("No plan found for " + dayName);
        return;
      }

      const workoutData = {
        type: dayPlan.type,
        exercises: dayPlan.exercises,
      };

      await workoutService.saveWorkout(user.uid, date, workoutData);
      setWorkout(workoutData);
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Error adding workout");
    }
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

  const updateReps = async (exerciseIndex, setIndex, newReps) => {
    if (!user || !date || !workout) return;

    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map((exercise, exIdx) => {
        if (exIdx === exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set, setIdx) => {
              if (setIdx === setIndex) {
                return { ...set, reps: newReps };
              }
              return set;
            }),
          };
        }
        return exercise;
      }),
    };

    try {
      await workoutService.saveWorkout(user.uid, date, updatedWorkout);
      setWorkout(updatedWorkout);
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("Error updating workout");
    }
  };

  const updateWeight = async (exerciseIndex, oldWeight, newWeight) => {
    if (!user || !date || !workout) return;

    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map((exercise, exIdx) => {
        if (exIdx === exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => ({
              ...set,
              weight:
                set.weight === oldWeight ? newWeight.toString() : set.weight,
            })),
          };
        }
        return exercise;
      }),
    };

    try {
      await workoutService.saveWorkout(user.uid, date, updatedWorkout);
      setWorkout(updatedWorkout);
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("Error updating workout");
    }
  };

  const renderExercise = (exercise, exerciseIndex) => {
    const formatRepsDisplay = (sets) => {
      const uniqueWeights = [...new Set(sets.map((set) => set.weight))];
      if (uniqueWeights.length === 1) {
        return (
          <span>
            {sets.map((set, idx) => (
              <React.Fragment key={idx}>
                <EditableField
                  initialValue={set.reps}
                  onSave={(newReps) => updateReps(exerciseIndex, idx, newReps)}
                />
                {idx < sets.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </span>
        );
      } else {
        return (
          <span>
            {sets.reduce((acc, set, idx) => {
              if (idx % 2 === 0) {
                const pair = (
                  <React.Fragment key={idx}>
                    <EditableField
                      initialValue={set.reps}
                      onSave={(newReps) =>
                        updateReps(exerciseIndex, idx, newReps)
                      }
                    />
                    /
                    <EditableField
                      initialValue={sets[idx + 1].reps}
                      onSave={(newReps) =>
                        updateReps(exerciseIndex, idx + 1, newReps)
                      }
                    />
                    {idx < sets.length - 2 ? " " : ""}
                  </React.Fragment>
                );
                acc.push(pair);
              }
              return acc;
            }, [])}
          </span>
        );
      }
    };

    const weights = [...new Set(exercise.sets.map((set) => set.weight))];
    const weightDisplay = weights.map((weight, idx) => (
      <React.Fragment key={weight}>
        <EditableField
          initialValue={weight}
          onSave={(newWeight) => updateWeight(exerciseIndex, weight, newWeight)}
        />
        {idx < weights.length - 1 ? "/" : ""}
      </React.Fragment>
    ));

    return (
      <div
        key={exercise.name}
        className="m-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
      >
        <h2 className="font-bold text-gray-800">{exercise.name}</h2>
        <p className="mt-2 text-gray-700">Weight: {weightDisplay}kg</p>
        <p className="mt-1 text-gray-700">
          Reps per set: {formatRepsDisplay(exercise.sets)}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          Calendar
        </h1>
      </div>

      {daySelected === false && (
        <div className="container mx-auto max-w-md p-4">
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
            className="rounded-xl border bg-white shadow-lg"
            weekStartsOn={1}
            month={displayedMonth}
            onMonthChange={setDisplayedMonth}
          />
        </div>
      )}

      {daySelected === true && workout && (
        <div className="container mx-auto max-w-md p-4">
          <h1 className="mb-4 text-center text-xl font-bold text-gray-800">
            {formatDate(date)} - {workout.type}
          </h1>
          {workout.exercises.map((exercise, index) =>
            renderExercise(exercise, index),
          )}
        </div>
      )}

      {daySelected === true && !workout && (
        <div className="container mx-auto max-w-md p-4 text-center">
          <p className="text-gray-700">
            No workout found for {formatDate(date)}
          </p>
          <button
            onClick={addSampleWorkout}
            className="mt-6 rounded-lg bg-gray-700 px-6 py-2 text-sm text-white shadow-md hover:bg-gray-600"
          >
            Add Workout Template
          </button>
        </div>
      )}
    </div>
  );
}
