import React, { useState, useEffect } from "react";
import { ArrowLeft, X, GripHorizontal, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import format from "date-fns/format";
import isFuture from "date-fns/isFuture";
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

const SortableExercise = ({
  exercise,
  exerciseIndex,
  isEditMode,
  onDelete,
  onUpdateReps,
  onUpdateWeight,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: exerciseIndex,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 0,
    position: "relative",
    backgroundColor: "white",
  };

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
                    initialValue={sets[idx + 1].reps}
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
    <div
      ref={setNodeRef}
      style={style}
      className={`m-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow ${
        isDragging ? "shadow-2xl" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {isEditMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-grab touch-none active:cursor-grabbing"
          >
            <GripHorizontal className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <h2 className="flex-1 font-bold text-gray-800">{exercise.name}</h2>
        {!isEditMode && (
          <button
            onClick={() => onDelete(exerciseIndex)}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <p className="mt-2 text-gray-700">Weight: {weightDisplay}kg</p>
      <p className="mt-1 text-gray-700">
        Reps per set: {formatRepsDisplay(exercise.sets)}
      </p>
    </div>
  );
};

export default function CalendarPage() {
  const [daySelected, setDaySelected] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const { user } = useAuth();
  const [displayedMonth, setDisplayedMonth] = useState(new Date());

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleEmptyWorkout = async (workoutData) => {
    if (
      workoutData &&
      (!workoutData.exercises || workoutData.exercises.length === 0)
    ) {
      try {
        await workoutService.deleteWorkout(user.uid, date);
        setWorkout(null);
        return null;
      } catch (error) {
        console.error("Error deleting empty workout:", error);
      }
    }
    return workoutData;
  };

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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = active.id;
    const newIndex = over.id;

    const updatedWorkout = {
      ...workout,
      exercises: arrayMove(workout.exercises, oldIndex, newIndex),
    };

    // Update local state first
    setWorkout(updatedWorkout);

    // Then handle the backend update
    try {
      await workoutService.saveWorkout(user.uid, date, updatedWorkout);
      const processedWorkout = await handleEmptyWorkout(updatedWorkout);

      if (!processedWorkout) {
        setWorkout(null);
      }
    } catch (error) {
      console.error("Error updating workout order:", error);
      // On error, revert to the original order
      setWorkout(workout);
      alert("Error updating workout order");
    }
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
      const processedWorkout = await handleEmptyWorkout(workoutData);
      setWorkout(processedWorkout);
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Error adding workout");
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      if (user && date) {
        const workoutData = await workoutService.getWorkout(user.uid, date);
        const processedWorkout = await handleEmptyWorkout(workoutData);
        setWorkout(processedWorkout);
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
      const processedWorkout = await handleEmptyWorkout(updatedWorkout);
      setWorkout(processedWorkout);
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
      const processedWorkout = await handleEmptyWorkout(updatedWorkout);
      setWorkout(processedWorkout);
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("Error updating workout");
    }
  };

  const deleteExercise = async (exerciseIndex) => {
    const exercises = workout.exercises.filter(
      (_, idx) => idx !== exerciseIndex,
    );

    try {
      if (exercises.length === 0) {
        await workoutService.deleteWorkout(user.uid, date);
        setWorkout(null);
      } else {
        const updatedWorkout = { ...workout, exercises };
        await workoutService.saveWorkout(user.uid, date, updatedWorkout);
        const processedWorkout = await handleEmptyWorkout(updatedWorkout);
        setWorkout(processedWorkout);
      }
    } catch (error) {
      console.error("Error updating/deleting workout:", error);
      alert("Error updating workout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft className="cursor-pointer" onClick={handleBack} />
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
          <h1 className="mb-2 text-center text-xl font-bold text-gray-800">
            {formatDate(date)} - {workout.type}
          </h1>
          <div className="mb-4 text-center">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
            >
              <Settings2 size={16} />
              {isEditMode ? "Done" : "Edit Order"}
            </button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[]}
          >
            <SortableContext
              items={workout.exercises.map((_, index) => index)}
              strategy={verticalListSortingStrategy}
            >
              {workout.exercises.map((exercise, index) => (
                <SortableExercise
                  key={`${exercise.name}-${index}`}
                  exercise={exercise}
                  exerciseIndex={index}
                  isEditMode={isEditMode}
                  onDelete={deleteExercise}
                  onUpdateReps={updateReps}
                  onUpdateWeight={updateWeight}
                />
              ))}
            </SortableContext>
          </DndContext>
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
