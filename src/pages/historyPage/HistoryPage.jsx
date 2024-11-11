import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-blue-200 text-white">
      <div className="flex items-center justify-start bg-slate-600 p-4 text-2xl">
        <ArrowLeft onClick={() => navigate("/")} />
      </div>
      <div className="m-3 text-center">history page</div>
    </div>
  );
}
