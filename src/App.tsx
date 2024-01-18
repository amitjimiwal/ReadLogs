import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser().then(userData => {
      if (userData) dispatch(login({ userData }))
      else dispatch(logout());
    }).catch(err => {
      console.log("Error handler");
      console.log(err);
    })
  }, [dispatch]);
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
