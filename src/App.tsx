import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="min-h-screen w-full dark">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
