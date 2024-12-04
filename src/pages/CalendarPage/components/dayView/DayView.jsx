import React, { useState } from "react";
import { Settings2, Save } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { GripHorizontal, X } from "lucide-react";
import EditableField from "../EditableField";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import WorkoutDisplay from "../WorkoutDisplay";
import { format } from "date-fns";
// import { workoutService } from "../../services/workoutService";
import { workoutService } from "@/services/workoutService";
import { planService } from "@/services/planService";

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
    transform: DndCSS.Transform.toString(transform),
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
      <p className="mt-1 text-gray-700">Weight: {weightDisplay}kg</p>
      <p className="mt-1 text-gray-700">
        Reps per set: {formatRepsDisplay(exercise.sets)}
      </p>
    </div>
  );
};

const DayView = ({
  date,
  user,
  workout,
  setWorkout,
  formatDate,
  hasChanges,
  setHasChanges,
  setShowSuccess,
  sensors,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

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

  const updatePlanWithCurrentValues = async () => {
    if (!user || !date || !workout) return;

    try {
      const currentDayName = format(date, "EEEE").toLowerCase();
      const currentPlan = await planService.getPlan(user.uid, currentDayName);

      if (!currentPlan) return;

      const updatedPlan = {
        ...currentPlan,
        exercises: workout.exercises.map((workoutExercise) => {
          const planExercise = currentPlan.exercises.find(
            (e) => e.name === workoutExercise.name,
          );

          if (planExercise) {
            return {
              ...planExercise,
              sets: workoutExercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps,
              })),
            };
          }
          return workoutExercise;
        }),
      };

      await planService.savePlan(user.uid, currentDayName, updatedPlan);
      setHasChanges(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating plan:", error);
    }
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

    setWorkout(updatedWorkout);

    try {
      await workoutService.saveWorkout(user.uid, date, updatedWorkout);
      const processedWorkout = await handleEmptyWorkout(updatedWorkout);
      if (!processedWorkout) {
        setWorkout(null);
      }
    } catch (error) {
      console.error("Error updating workout order:", error);
      setWorkout(workout);
      alert("Error updating workout order");
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
      setHasChanges(true);
    } catch (error) {
      console.error("Error updating workout:", error);
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
      setHasChanges(true);
    } catch (error) {
      console.error("Error updating workout:", error);
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

  if (!workout) {
    return (
      <div className="container mx-auto max-w-md p-4 text-center">
        <p className="text-gray-700">No workout found for {formatDate(date)}</p>
        <button
          onClick={addSampleWorkout}
          className="mt-6 rounded-lg bg-gray-700 px-6 py-2 text-sm text-white shadow-md hover:bg-gray-600"
        >
          Add Workout Template
        </button>
      </div>
    );
  }

  return (
    <WorkoutDisplay
      date={date}
      workout={workout}
      formatDate={formatDate}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      sensors={sensors}
      hasChanges={hasChanges}
      handleDragEnd={handleDragEnd}
      SortableExercise={SortableExercise}
      deleteExercise={deleteExercise}
      updateReps={updateReps}
      updateWeight={updateWeight}
      updatePlanWithCurrentValues={updatePlanWithCurrentValues}
    />
  );
};

export default DayView;
