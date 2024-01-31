import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./redux/slices/authSlice";
import LoadingScreen from "./pages/LoadingScreen";
import { ToastContainer } from "react-toastify";
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .catch((err) => {
        console.log("Error handler");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);
  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
