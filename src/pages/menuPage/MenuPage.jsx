import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const navigate = useNavigate();
  const headlines = ["Calendar", "Profile", "Plans", "History"];

  // Function to chunk array into pairs
  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  // Split headlines into rows of two
  const rows = chunk(headlines, 2);

  return (
    <div className="h-screen bg-blue-200 text-white">
      <div className="flex items-center justify-center bg-slate-600 p-4 text-2xl">
        Menu
      </div>
      <div className="m-3 flex flex-col space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-3">
            {row.map((headline, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  const path = `/${headline.toLowerCase().replace(/\s+/g, "")}`;
                  navigate(path);
                }}
                className="flex h-24 w-1/2 items-center justify-center rounded-lg border border-black bg-blue-400 p-3"
              >
                {headline === "+" ? <Plus /> : headline}
              </div>
            ))}
            {/* If row has only one item, add empty div to maintain layout */}
            {row.length === 1 && <div className="w-1/2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
