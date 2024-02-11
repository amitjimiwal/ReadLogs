import authService from "@/appwrite/authService";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { login } from "@/redux/slices/authSlice";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
type LoginFiels = {
  email: string;
  password: string;
};
const LoginScreen = () => {
  const [loader, setLoader] = useState<boolean | undefined>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginFiels>();
  const loginHandler: SubmitHandler<LoginFiels> = async (data: LoginFiels) => {
    try {
      setLoader(true);
      const session = await authService.login(data);
      if (session) {
        authService.getCurrentUser().then((userData) => {
          setLoader(false);
          toast.success("Login Success");
          if (userData) {
            dispatch(login(userData));
            navigate("/reads");
          }
        });
      }
    } catch (error) {
      setLoader(false);
      toast.error(error as string);
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
          {loader ? (
            <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-8 border-t-blue-600" />
          ) : (
            "Login to Your Account"
          )}
        </Button>
        {/* <div className="max-w-md text-center mt-5">
          <button
            type="button"
            className="text-white  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55"
            onClick={() => {
              authService.createGoogleOAuth2Session(`${config.frontendURL}/login`,`${config.frontendURL}/reads`).then((res)=>{
                console.log(res);
              })
            }}
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign In with Google
          </button>
        </div> */}
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
