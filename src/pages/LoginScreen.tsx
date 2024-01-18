import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
type LoginFiels = {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const { register, handleSubmit } = useForm<LoginFiels>();
  const loginHandler: SubmitHandler<LoginFiels> = (data: LoginFiels) => {
    console.log(data);
  };
  return (
    <section className='w-full text-center h-[90vh] bg-gradient-to-t from-gray-700 via-gray-900 to-black flex flex-col justify-center items-center '>
      <form onSubmit={handleSubmit(loginHandler)} className='p-4 shadow-xl border-gray-700 rounded-xl'>
        <Input
          type="text"
          label="Email"
          placeholder="Enter Email"
          {...(register("email", {
            required: true
          }))}
          className='bg-transparent border-2 rounded-xl
          border-white p-2 text-white placeholder:text-gray-700'

        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter Password"
          {...(register("password", {
            required: true
          }))}
          className='bg-transparent border-2 rounded-xl
          border-white p-2 text-white placeholder:text-gray-700'

        />
        <Button type="submit" size={"lg"}>
          Login to Your Account
        </Button>
        <div className="mt-5 text-white font-bold ">
          {" "}
          Don't have a account ? <span className="text-yellow-300 underline "> <NavLink to={"/signup"}>Sign up</NavLink>
          </span>        </div>
      </form>
    </section>
  );
};

export default LoginScreen;
