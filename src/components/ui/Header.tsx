import React from "react";
import { Button } from "./button";
import { MoveRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/store/store";
import logo from "../../assets/images/logo.png";
import { Models } from "appwrite";
const Header = () => {
  const user: Models.User<Models.Preferences> | undefined = useSelector(
    (state: AuthState) => state.auth.userData
  );
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="p-4 flex items-center justify-between bg-inherit h-[10vh]">
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
      <div className="flex items-center sm:gap-4">
        <a
          href="https://www.producthunt.com/posts/readlogs?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-readlogs"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=441285&theme=light"
            alt="ReadLogs - ReadLogs&#0058;&#0032;Store&#0044;&#0032;read&#0044;&#0032;and&#0032;never&#0032;miss&#0032;a&#0032;beat&#0046; | Product Hunt"
            width="150"
            height="54"
          />
        </a>
        <Button
          onClick={() => {
            authStatus
              ? location.pathname === "/reads"
                ? navigate(`/user/${user?.name}`)
                : navigate("/reads")
              : navigate("/login");
          }}
          size={"lg"}
        >
          {authStatus
            ? location.pathname === "/reads"
              ? "Profile"
              : "Dashboard"
            : "Get Started"}{" "}
          <MoveRight size={24} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
