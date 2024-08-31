import React from "react";
import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading} from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center"> 
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
           <Heading label={"Sign In"}/>
           <SubHeading label={"Enter your credentials to access your account"}/>
           <InputBox  placeHolder="aish123@gmail.com" label={"Email"} onChange={(e)=>{
            setUserName(e.target.value)
           }}/>
           <InputBox  placeHolder="123456" label={"Password"} onChange={(e)=>{
            setPassword(e.target.value)
           }}/>
           <div className="pt-4">
              <Button label={"Sign in"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard")
                    }} />
           </div>
           <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
          </div>
        </div>
    </div>
}

