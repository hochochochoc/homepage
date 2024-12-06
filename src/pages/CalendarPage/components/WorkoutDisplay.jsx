import { Settings2, Save } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const WorkoutDisplay = ({
  date,
  workout,
  formatDate,
  isEditMode,
  setIsEditMode,
  sensors,
  hasChanges,
  handleDragEnd,
  SortableExercise,
  deleteExercise,
  updateReps,
  updateWeight,
  updateName,
  updatePlanWithCurrentValues,
}) => {
  if (!workout) return null;

  return (
    <div className="container mx-auto max-w-md px-4 py-3">
      <h1 className="mb-2 text-center text-xl font-bold text-gray-800">
        {formatDate(date)} - {workout.type}
      </h1>
      <div className="mb-4 flex justify-center gap-2">
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
              onUpdateName={updateName}
            />
          ))}
        </SortableContext>
      </DndContext>
      {hasChanges && (
        <div className="my-4 text-center">
          <button
            onClick={updatePlanWithCurrentValues}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-300"
          >
            <Save size={16} />
            Update Plan Template
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDisplay;
