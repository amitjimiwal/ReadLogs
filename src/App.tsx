import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
  }, []);
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center text-white">
      {/* <h1 className="text-3xl text-white">ReadLogs</h1> */}
      <Outlet />
    </div>
  );
}

export default App;
