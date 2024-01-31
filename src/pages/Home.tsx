import { Button } from "@/components/ui/button";
import { AuthState } from "@/redux/store/store";
import { MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authStatus = useSelector((state: AuthState) => state.auth.status);
  const navigate = useNavigate();
  return (
    <div className="h-[90vh] w-full bg-gradient-to-b from-slate-50 to-slate-600">
      <div className="flex flex-col justify-center items-center h-full w-full gap-4">
        <h1 className="text-6xl sm:text-9xl text-center text-black font-bold">
          ReadLogs
        </h1>
        <h2 className="text-3xl sm:text-3xl text-center text-subheading font-medium">
          A simple and easy to use reading and links manager
        </h2>
        <div className="flex gap-5 items-center flex-wrap justify-center">
          <Button variant={"outline"} size={"lg"}>
            <a href="https://github.com/amitjimiwal/ReadLogs">
              {" "}
              Star On Github{" "}
            </a>
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
