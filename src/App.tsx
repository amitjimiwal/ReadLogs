import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="min-h-screen w-full dark">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
