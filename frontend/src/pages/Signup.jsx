import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading} from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import axios from "axios";

export const Signup =()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
           <Heading label={"Sign up"}/>
           <SubHeading label={"Enter your information to create your account"}/>
           <InputBox  placeHolder="John" label={"First Name"} onChange={(e)=>{
            setFirstName(e.target.value)
           }}/>
           <InputBox  placeHolder="Doe" label={"Last Name"} onChange={(e)=>{
            setLastName(e.target.value)
           }}/>
           <InputBox  placeHolder="aish123@gmail.com" label={"Email"} onChange={(e)=>{
            setUserName(e.target.value)
           }}/>
           <InputBox  placeHolder="123456" label={"Password"} onChange={(e)=>{
            setPassword(e.target.value)
           }}/>
           <div className="pt-4">
              <Button label={"Signup"} onClick={()=>{
                axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                })
              }}/>
           </div>
           <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
          </div>
        </div>
    </div>
}

