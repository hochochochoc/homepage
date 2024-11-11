import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import format from "date-fns/format";
import { isFuture } from "date-fns";
import { workoutService } from "../../services/workoutService";
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
    if (!user) return;

    const workoutData = {
      type: "Chest Biceps",
      exercises: [
        {
          name: "Incline DB Curls",
          sets: [
            { weight: "9", reps: 18 },
            { weight: "10", reps: 15 },
            { weight: "9", reps: 12 },
            { weight: "10", reps: 10 },
            { weight: "9", reps: 8 },
            { weight: "10", reps: 5 },
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
            { weight: "20", reps: 12 },
            { weight: "20", reps: 10 },
          ],
        },
        {
          name: "DB Flyes",
          sets: [
            { weight: "8", reps: 13 },
            { weight: "9", reps: 12 },
            { weight: "8", reps: 10 },
            { weight: "9", reps: 8 },
          ],
        },
        {
          name: "Core",
          sets: [
            { weight: "70", reps: 20 },
            { weight: "70", reps: 17 },
            { weight: "70", reps: 15 },
          ],
        },
      ],
    };

    try {
      await workoutService.saveWorkout(user.uid, date, workoutData);
      alert(`Sample workout added for ${formatDate(date)}!`);
      setWorkout(workoutData);
    } catch (error) {
      console.error("Error adding sample workout:", error);
      alert("Error adding sample workout");
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
        className="m-2 rounded-lg border border-black bg-green-300/20 p-2 text-black shadow-lg"
      >
        <h2 className="font-bold">{exercise.name}</h2>
        <p className="ml-2">Weight: {weightDisplay}kg</p>
        <p className="ml-2">Reps per set: {formatRepsDisplay(exercise.sets)}</p>
      </div>
    );
  };

  return (
    <div className="h-screen text-white">
      <div className="flex items-center justify-between bg-slate-500 p-4 text-2xl">
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
          {workout.exercises.map((exercise, index) =>
            renderExercise(exercise, index),
          )}
        </div>
      )}
      {daySelected === true && !workout && (
        <div className="m-3 text-center text-black">
          <p>No workout found for this date</p>
          <button
            onClick={addSampleWorkout}
            className="my-6 rounded bg-blue-200 px-4 py-2 text-sm hover:bg-green-600"
          >
            Add Sample Workout
          </button>
        </div>
      )}
    </div>
  );
}
