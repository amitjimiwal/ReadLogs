import Input from "@/components/ui/Input";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import authService from "@/appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
type SignupFields = {
  name: string;
  email: string;
  password: string;
};
const SignUpScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<SignupFields>();
  const signupHandler: SubmitHandler<SignupFields> = async (
    data: SignupFields
  ) => {
    console.log(data);
    try {
      const session = await authService.createUser(data);
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
    <section className="w-full text-center h-[90vh] flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="p-3 shadow-xl border-gray-700 sm:w-1/4"
      >
        <Input
          type="text"
          label="username"
          placeholder="Enter your Name"
          {...register("name", {
            required: true,
          })}
          className="bg-transparent rounded-xl
          p-2 text-black placeholder:text-gray-700 w-full outline-none border-b-4 border-black"
        />

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
          Sign Up
        </Button>
        <div className="text-black font-bold mt-4">
          {" "}
          Already have an account ?{" "}
          <span className="text-yellow-400 underline">
            {" "}
            <NavLink to={"/login"}>Login</NavLink>
          </span>{" "}
        </div>
      </form>
    </section>
  );
};

export default SignUpScreen;
