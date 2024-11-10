import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GymPage() {
  const headlines = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daySelected, setDaySelected] = useState(false);
  const navigate = useNavigate();

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
      <div className="flex items-center justify-start bg-slate-600 p-4 text-2xl">
        <ArrowLeft
          onClick={() => {
            if (daySelected === false) {
              navigate("/");
            } else setDaySelected(false);
          }}
        />
      </div>
      {daySelected === false && (
        <div className="m-3 flex flex-col space-y-3">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-3">
              {row.map((headline, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex h-24 w-1/2 items-center justify-center rounded-lg border border-black bg-green-800 p-3"
                  onClick={() => setDaySelected(true)}
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
          <h1 className="my-3 text-center">Nov 11 Lun - Chest Biceps</h1>
          <div className="m-1 rounded-lg border border-black bg-green-900 p-2 text-white">
            <h2 className="font-bold">Incline DB Curls</h2>
            <p className="ml-2">Weight: 9/10 kg</p>
            <p className="ml-2">Reps: 18/15 10/8 7/7</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-900 p-2 text-white">
            <h2 className="font-bold">Concentration Curls</h2>
            <p className="ml-2">Weight: 12 kg</p>
            <p className="ml-2">Reps: 11 9 9</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-900 p-2 text-white">
            <h2 className="font-bold">Bench Press</h2>
            <p className="ml-2">Weight: 20/16 kg</p>
            <p className="ml-2">Reps: 20kg: 16 10 16kg: 9</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-900 p-2 text-white">
            <h2 className="font-bold">DB Flyes</h2>
            <p className="ml-2">Weight: 8/9 kg</p>
            <p className="ml-2">Reps: 13/12 12/12 12/12</p>
          </div>
          <div className="m-1 rounded-lg border border-black bg-green-900 p-2 text-white">
            <h2 className="font-bold">Core</h2>
            <p className="ml-2">Weight: 70 kg</p>
            <p className="ml-2">Reps: 20 17:3 15:3:2</p>
          </div>
        </div>
      )}
    </div>
  );
}
