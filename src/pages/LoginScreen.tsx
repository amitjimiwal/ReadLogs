import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
type LoginFiels ={
  email: string;
  password: string;
}
const LoginScreen = () => {
  const { register, handleSubmit } = useForm<LoginFiels>();
  const loginHandler: SubmitHandler<LoginFiels> = (data: LoginFiels) => {
    console.log(data);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(loginHandler)}>
        <Input
          type="text"
          label="Email"
          placeholder="Enter Email"
          {...(register("email"), { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter Password"
          {...(register("password"), { required: true })}
        />
        <Button type="submit" size={"lg"}>
          Submit
        </Button>
      </form>
      <div>
        {" "}
        Don't have a account ? <NavLink to={"/signup"}>SignUP</NavLink>
      </div>
    </section>
  );
};

export default LoginScreen;
