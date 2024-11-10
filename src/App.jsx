import React, { useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menuPage/MenuPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
