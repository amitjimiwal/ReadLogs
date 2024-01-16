import Input from '@/components/ui/Input';
import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';

const SignUpScreen:React.FC= () => {
  const email=useRef<HTMLInputElement>(null);
  const passwordref=useRef<HTMLInputElement>(null);
  return (
    <section>
      <div>
      <Input type="text" label="Email" ref={email} placeholder='Enter Email'/>
      <Input type="password" label="Password" placeholder='Enter Password' ref={passwordref}/>
      </div>
      <div> Don't have a account ? <NavLink to={"/signup"}>SignUP</NavLink></div>
    </section>
  )
}

export default SignUpScreen
