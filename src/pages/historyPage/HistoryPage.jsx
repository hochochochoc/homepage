import React from "react";
import ProgressAnalysis from "./components/ProgressAnalysis";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UniqueVisitorCard from "./templateChart/UniqueVisitorCard";

export default function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/menu")}
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          History
        </h1>
      </div>
      <div className="mx-auto max-w-6xl p-3">
        <UniqueVisitorCard />
      </div>
      <ProgressAnalysis />
      <button className="text-gray-50" onClick={() => navigate("/map")}>
        secret map page
      </button>
    </div>
  );
}
