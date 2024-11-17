import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UniqueVisitorCard from "./templateChart/UniqueVisitorCard";

export default function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white text-black">
      <div className="flex items-center justify-start bg-slate-600 px-4 py-2 text-2xl text-white">
        <ArrowLeft onClick={() => navigate("/")} />
        <h1 className="ml-20"> History </h1>
      </div>
      <div className="m-3">
        <div className="mt-4">
          <UniqueVisitorCard />
        </div>
      </div>
    </div>
  );
}
