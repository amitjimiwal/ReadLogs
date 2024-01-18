import Input from '@/components/ui/Input';
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
type SignupFields = {
  name: string;
  email: string;
  password: string;
}
const SignUpScreen: React.FC = () => {
  const { register, handleSubmit } = useForm<SignupFields>();
  const signupHandler: SubmitHandler<SignupFields> = (data: SignupFields) => {
    console.log(data);
  };
  return (
    <section className='w-full text-center h-[90vh] bg-gradient-to-t from-gray-700 via-gray-900 to-black flex flex-col justify-center items-center '>
      <form onSubmit={handleSubmit(signupHandler)} className='p-3 shadow-xl border-gray-700'>
        <Input
          type="text"
          label="Name"
          placeholder="Enter your Name"
          {...(register("name", {
            required: true
          }))}
          className='bg-transparent border-2 rounded-xl
          border-white p-2 text-white placeholder:text-gray-700'
        />

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
          Sign Up
        </Button>
        <div className='text-white font-bold mt-4'>
          {" "}
          Already have an account ?  <span className='text-yellow-400 underline'> <NavLink to={"/login"}>Login</NavLink>
          </span>     </div>
      </form>
    </section>
  );
}

export default SignUpScreen
