import { useState } from "react";

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

export default EditableField;
