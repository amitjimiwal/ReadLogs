import React from "react";
import { Button } from "./button";
import { MoveRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import logo from "../../assets/images/logo.png";
const Header = () => {
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <header className="p-4 flex items-center justify-between bg-black h-[10vh]">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={logo}
          alt="ReadLogs logo"
          className="w-14 rounded-full shadow-md"
        />
      </div>
      <Button
        onClick={() => {
          authStatus ? navigate("/reads") : navigate("/login");
        }}
        size={"lg"}
      >
        {authStatus ? location.pathname === "/reads" ? "Profile" : "Dashboard" : "Get Started"} <MoveRight size={24} />
      </Button>
    </header>
  );
};

export default Header;
