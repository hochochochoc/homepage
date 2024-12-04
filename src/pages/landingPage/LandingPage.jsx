import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Welcome to Fitness Tracker
      </h1>
      <button
        onClick={() => navigate("/menu")}
        className="rounded-lg bg-blue-900 px-8 py-3 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-200 hover:shadow-xl"
      >
        Get Started
      </button>
    </div>
  );
}
