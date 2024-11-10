import React, { useState } from "react";

export default function GymPage() {
  const headlines = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daySelected, setDaySelected] = useState(true);

  // Function to chunk array into pairs
  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  // Split headlines into rows of two
  const rows = chunk(headlines, 2);

  return (
    <div className="h-screen bg-green-200 text-white">
      <div className="flex items-center justify-center bg-slate-600 p-4 text-2xl">
        Areas
      </div>
      {daySelected === false && (
        <div className="m-3 flex flex-col space-y-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-3">
              {row.map((headline, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex h-24 w-1/2 items-center justify-center rounded-lg border border-black bg-green-800 p-3"
                >
                  {headline}
                </div>
              ))}
              {/* If row has only one item, add empty div to maintain layout */}
              {row.length === 1 && <div className="w-1/2" />}
            </div>
          ))}
        </div>
      )}
      {daySelected === true && (
        <div className="m-3 text-black">
          <div>Exercise 1</div>
          <div>Exercise 2</div>
          <div>Exercise 3</div>
        </div>
      )}
    </div>
  );
}
