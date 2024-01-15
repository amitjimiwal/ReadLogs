import { Button } from "@/components/ui/button";
import { AuthState } from "@/redux/store/store";
import { MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black h-[90vh] w-full">
      <div className="flex flex-col justify-center items-center h-full w-full gap-4">
        <h1 className="text-6xl sm:text-9xl text-center text-[#B8F2E6] font-bold">
          ReadLogs
        </h1>
        <h2 className="text-3xl sm:text-3xl text-center text-[#FAF3DD] font-medium">
          A simple and easy to use reading tracker
        </h2>
        <div className="flex gap-5 items-center">
          <Button variant={"secondary"} size={"lg"}>
            {" "}
            Star On Github{" "}
          </Button>
          <Button
            onClick={() => {
              authStatus ? navigate("/reads") : navigate("/login");
            }}
            size={"lg"}
          >
            {authStatus ? "DashBoard" : "Get Started"} <MoveRight size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
