import React, { useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menuPage/MenuPage";
import CalendarPage from "./pages/calendarPage/CalendarPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import PlansPage from "./pages/plansPage/PlansPage";
import HistoryPage from "./pages/historyPage/HistoryPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
