import React, { useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/menuPage/MenuPage";
import GymPage from "./pages/gymPage/GymPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/gym" element={<GymPage />} />
      </Routes>
    </>
  );
}

export default App;
