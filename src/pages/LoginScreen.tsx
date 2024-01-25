import authService from "@/appwrite/authService";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { login } from "@/redux/slices/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
type LoginFiels = {
  email: string;
  password: string;
};
const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginFiels>();
  const loginHandler: SubmitHandler<LoginFiels> = async (data: LoginFiels) => {
    try {
      const session = await authService.login(data);
      if (session) {
        authService.getCurrentUser().then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
            navigate("/reads");
          }
        });
      }
    } catch (error) {
      console.log("Login page error");
      console.log(error);
    }
  };

  return (
    <section className="w-full text-center h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="p-4 shadow-xl border-gray-700 rounded-xl sm:w-1/4"
      >
        <Input
          type="text"
          label="Email"
          placeholder="Enter Email"
          {...register("email", {
            required: true,
          })}
          className="bg-transparent rounded-xl
           p-2 text-black placeholder:text-gray-700 w-full outline-none border-b-4 border-black"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter Password"
          {...register("password", {
            required: true,
          })}
          className="bg-transparent rounded-xl
          p-2 text-black placeholder:text-gray-700 w-full outline-none border-b-4 border-black"
        />
        <Button type="submit" size={"lg"}>
          Login to Your Account
        </Button>
        <div className="mt-5 text-black font-bold ">
          {" "}
          Don't have a account ?{" "}
          <span className="text-yellow-300 underline ">
            {" "}
            <NavLink to={"/signup"}>Sign up</NavLink>
          </span>{" "}
        </div>
      </form>
    </section>
  );
};

export default LoginScreen;
