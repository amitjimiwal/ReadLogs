import React, { useEffect } from "react";
import "./App.css";
import authService from "./appwrite/authService";
import dbService from "./appwrite/dbService";
import { ID } from "appwrite";

function App() {
  useEffect(() => {
  }, []);
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <h1 className="text-3xl text-white">ReadLogs</h1>
    </div>
  );
}

export default App;
