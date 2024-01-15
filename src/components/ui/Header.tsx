import React from "react";
import { Button } from "./button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import Logo from "../../assets/images/logo.png";
const Header = () => {
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const navigate = useNavigate();
  return (
    <header className="p-4 flex items-center justify-between bg-black h-[10vh]">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={Logo}
          alt="ReadLogs Logo"
          className="w-14 rounded-full shadow-md"
        />
      </div>
      <Button
        onClick={() => {
          authStatus ? navigate("/reads") : navigate("/login");
        }}
        size={"lg"}
      >
        {authStatus ? "DashBoard" : "Get Started"} <MoveRight size={24} />
      </Button>
    </header>
  );
};

export default Header;
