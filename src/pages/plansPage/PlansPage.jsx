import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { planService } from "@/services/planService";
import { defaultWorkoutPlans } from "./components/defaultData";

const EditableField = ({ initialValue, onSave, type = "number" }) => {
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
    if (type === "number") {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onSave(numValue);
        setIsEditing(false);
      }
    } else {
      if (value.trim()) {
        onSave(value.trim());
        setIsEditing(false);
      }
    }
  };

  if (isEditing) {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`rounded border border-gray-300 px-1 text-black focus:outline-none focus:ring focus:ring-blue-300 ${
          type === "number" ? "w-8 text-center" : "w-full"
        }`}
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

const ExerciseDisplay = ({
  exercise,
  exerciseIndex,
  onUpdateReps,
  onUpdateWeight,
  onUpdateName,
}) => {
  const formatRepsDisplay = (sets) => {
    const uniqueWeights = [...new Set(sets.map((set) => set.weight))];
    if (uniqueWeights.length === 1) {
      return (
        <span>
          {sets.map((set, idx) => (
            <React.Fragment key={idx}>
              <EditableField
                initialValue={set.reps}
                onSave={(newReps) => onUpdateReps(exerciseIndex, idx, newReps)}
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
                      onUpdateReps(exerciseIndex, idx, newReps)
                    }
                  />
                  /
                  <EditableField
                    initialValue={sets[idx + 1]?.reps}
                    onSave={(newReps) =>
                      onUpdateReps(exerciseIndex, idx + 1, newReps)
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
        onSave={(newWeight) => onUpdateWeight(exerciseIndex, weight, newWeight)}
      />
      {idx < weights.length - 1 ? "/" : ""}
    </React.Fragment>
  ));

  return (
    <div className="border-b border-gray-100 bg-white p-2 px-4">
      <h2 className="font-bold text-gray-800">
        <EditableField
          initialValue={exercise.name}
          onSave={(newName) => onUpdateName(exerciseIndex, newName)}
          type="text"
        />
      </h2>
      <p className="text- mt-2">Weight: {weightDisplay}kg</p>
      <p className="text- mt-1">
        Reps per set: {formatRepsDisplay(exercise.sets)}
      </p>
    </div>
  );
};

const PlansPage = () => {
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState({});
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const loadPlans = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const savedPlans = await planService.getAllPlans(user.uid);

        if (Object.keys(savedPlans).length === 0) {
          await Promise.all(
            Object.entries(defaultWorkoutPlans).map(([day, plan]) =>
              planService.savePlan(user.uid, day, plan),
            ),
          );
          setWorkoutPlans(defaultWorkoutPlans);
        } else {
          setWorkoutPlans(savedPlans);
        }
      } catch (error) {
        console.error("Error loading plans:", error);
        alert("Error loading workout plans");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, [user]);

  const handleUpdateName = async (day, exerciseIndex, newName) => {
    if (!user) return;

    const dayLower = day.toLowerCase();
    const updatedPlan = {
      ...workoutPlans[dayLower],
      exercises: workoutPlans[dayLower].exercises.map((exercise, exIdx) => {
        if (exIdx === exerciseIndex) {
          return {
            ...exercise,
            name: newName,
          };
        }
        return exercise;
      }),
    };

    try {
      await planService.savePlan(user.uid, dayLower, updatedPlan);
      setWorkoutPlans((prev) => ({
        ...prev,
        [dayLower]: updatedPlan,
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Error updating workout plan");
    }
  };

  const handleUpdateReps = async (day, exerciseIndex, setIndex, newReps) => {
    if (!user) return;

    const dayLower = day.toLowerCase();
    const updatedPlan = {
      ...workoutPlans[dayLower],
      exercises: workoutPlans[dayLower].exercises.map((exercise, exIdx) => {
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
      await planService.savePlan(user.uid, dayLower, updatedPlan);
      setWorkoutPlans((prev) => ({
        ...prev,
        [dayLower]: updatedPlan,
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Error updating workout plan");
    }
  };

  const handleUpdateWeight = async (
    day,
    exerciseIndex,
    oldWeight,
    newWeight,
  ) => {
    if (!user) return;

    const dayLower = day.toLowerCase();
    const updatedPlan = {
      ...workoutPlans[dayLower],
      exercises: workoutPlans[dayLower].exercises.map((exercise, exIdx) => {
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
      await planService.savePlan(user.uid, dayLower, updatedPlan);
      setWorkoutPlans((prev) => ({
        ...prev,
        [dayLower]: updatedPlan,
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Error updating workout plan");
    }
  };

  const toggleDay = (dayName) => {
    setOpenDay(openDay === dayName ? null : dayName);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <p className="text-gray-700">Loading workout plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/menu")}
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          Plans
        </h1>
      </div>

      <div className="container mx-auto max-w-2xl p-4">
        {dayOrder.map((day) => {
          const workout = workoutPlans[day.toLowerCase()];
          if (!workout) return null;

          return (
            <div
              key={day}
              className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <div
                onClick={() => toggleDay(day)}
                className="flex cursor-pointer items-center justify-between bg-white p-4 hover:bg-gray-50"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {day} - {workout.type}
                </h2>
                {openDay === day ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </div>
              {openDay === day && (
                <div className="border-t border-gray-200 bg-white p-4">
                  {workout.type === "Rest" ? (
                    <p className="text-center italic text-gray-600">
                      Rest Day - No exercises scheduled
                    </p>
                  ) : (
                    workout.exercises.map((exercise, index) => (
                      <ExerciseDisplay
                        key={exercise.name + index}
                        exercise={exercise}
                        exerciseIndex={index}
                        onUpdateReps={(exerciseIndex, setIndex, newReps) =>
                          handleUpdateReps(
                            day,
                            exerciseIndex,
                            setIndex,
                            newReps,
                          )
                        }
                        onUpdateWeight={(exerciseIndex, oldWeight, newWeight) =>
                          handleUpdateWeight(
                            day,
                            exerciseIndex,
                            oldWeight,
                            newWeight,
                          )
                        }
                        onUpdateName={(exerciseIndex, newName) =>
                          handleUpdateName(day, exerciseIndex, newName)
                        }
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlansPage;
