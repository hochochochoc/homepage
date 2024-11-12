import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const ExerciseDisplay = ({
  exercise,
  exerciseIndex,
  onUpdateReps,
  onUpdateWeight,
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
    <div className="m-2 rounded-lg border border-black bg-green-300/20 p-2 text-black shadow-lg">
      <h2 className="font-bold">{exercise.name}</h2>
      <p className="ml-2">Weight: {weightDisplay}kg</p>
      <p className="ml-2">Reps per set: {formatRepsDisplay(exercise.sets)}</p>
    </div>
  );
};

const PlansPage = () => {
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState(null);

  const workoutPlans = {
    Monday: {
      type: "Chest Biceps Core",
      exercises: [
        {
          name: "Incline DB Curls",
          sets: [
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
            { weight: "40", reps: 15 },
            { weight: "40", reps: 10 },
            { weight: "40", reps: 8 },
          ],
        },
        {
          name: "DB Flyes",
          sets: [
            { weight: "9", reps: 12 },
            { weight: "9", reps: 12 },
            { weight: "9", reps: 12 },
          ],
        },
        {
          name: "Core",
          sets: [
            { weight: "70", reps: 20 },
            { weight: "70", reps: 20 },
            { weight: "70", reps: 15 },
          ],
        },
      ],
    },
    Tuesday: {
      type: "Legs",
      exercises: [
        {
          name: "Cube",
          sets: [
            { weight: "20", reps: 15 },
            { weight: "20", reps: 15 },
          ],
        },
        {
          name: "Leg Machine",
          sets: [
            { weight: "60", reps: 20 },
            { weight: "60", reps: 15 },
            { weight: "60", reps: 13 },
          ],
        },
        {
          name: "Calves Machine",
          sets: [
            { weight: "60", reps: 25 },
            { weight: "60", reps: 20 },
          ],
        },
      ],
    },
    Wednesday: {
      type: "Back Triceps Core",
      exercises: [
        {
          name: "Pull-ups",
          sets: [{ weight: "71", reps: 6 }],
        },
        {
          name: "Rowing Machine",
          sets: [
            { weight: "45", reps: 20 },
            { weight: "45", reps: 15 },
            { weight: "45", reps: 15 },
          ],
        },
        {
          name: "Triceps",
          sets: [
            { weight: "9", reps: 15 },
            { weight: "9", reps: 10 },
            { weight: "9", reps: 10 },
          ],
        },
        {
          name: "Core",
          sets: [
            { weight: "70", reps: 20 },
            { weight: "70", reps: 20 },
            { weight: "70", reps: 15 },
          ],
        },
      ],
    },
    Thursday: {
      type: "Chest Biceps",
      exercises: [
        {
          name: "Incline DB Curls",
          sets: [
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
            { weight: "40", reps: 15 },
            { weight: "40", reps: 10 },
            { weight: "40", reps: 8 },
          ],
        },
        {
          name: "DB Flyes",
          sets: [
            { weight: "9", reps: 12 },
            { weight: "9", reps: 12 },
            { weight: "9", reps: 12 },
          ],
        },
      ],
    },
    Friday: {
      type: "Shoulders Back Core",
      exercises: [
        {
          name: "Overhead Press",
          sets: [
            { weight: "22", reps: 16 },
            { weight: "22", reps: 8 },
            { weight: "22", reps: 7 },
          ],
        },
        {
          name: "Cable Shoulders",
          sets: [
            { weight: "10", reps: 16 },
            { weight: "10", reps: 15 },
            { weight: "10", reps: 14 },
          ],
        },
        {
          name: "Lat Pulldowns",
          sets: [
            { weight: "55", reps: 18 },
            { weight: "55", reps: 10 },
            { weight: "55", reps: 8 },
          ],
        },
        {
          name: "Core",
          sets: [
            { weight: "70", reps: 20 },
            { weight: "70", reps: 20 },
            { weight: "70", reps: 15 },
          ],
        },
      ],
    },
    Saturday: {
      type: "Rest",
      exercises: [],
    },
    Sunday: {
      type: "Rest",
      exercises: [],
    },
  };

  const toggleDay = (dayName) => {
    setOpenDay(openDay === dayName ? null : dayName);
  };

  const handleUpdateReps = (exerciseIndex, setIndex, newReps) => {
    console.log(
      `Updated reps for exercise ${exerciseIndex}, set ${setIndex} to ${newReps}`,
    );
  };

  const handleUpdateWeight = (exerciseIndex, oldWeight, newWeight) => {
    console.log(
      `Updated weight for exercise ${exerciseIndex} from ${oldWeight} to ${newWeight}`,
    );
  };

  return (
    <div className="h-screen bg-slate-100 text-black">
      <div className="flex items-center justify-start bg-slate-500 p-4 text-2xl text-white">
        <ArrowLeft onClick={() => navigate("/")} />
      </div>
      <div className="m-3 flex flex-col space-y-3">
        {Object.entries(workoutPlans).map(([day, workout]) => (
          <div
            key={day}
            className="rounded-lg border border-black bg-green-300/20 shadow-lg"
          >
            <div
              onClick={() => toggleDay(day)}
              className="flex cursor-pointer items-center justify-between p-4"
            >
              <h2 className="font-bold">
                {day} - {workout.type}
              </h2>
              {openDay === day ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
            {openDay === day && (
              <div className="border-t border-gray-200 p-4">
                {workout.type === "Rest" ? (
                  <p className="text-center italic">
                    Rest Day - No exercises scheduled
                  </p>
                ) : (
                  workout.exercises.map((exercise, index) => (
                    <ExerciseDisplay
                      key={exercise.name}
                      exercise={exercise}
                      exerciseIndex={index}
                      onUpdateReps={handleUpdateReps}
                      onUpdateWeight={handleUpdateWeight}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
