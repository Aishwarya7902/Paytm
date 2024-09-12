import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();
  const handleSignin = async () => {
    if (!username || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    try {
      const response = await axios.post("https://paytm-1-0zk2.onrender.com/api/v1/user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />

        <InputBox 
            type="email" 
            onChange={(e) => {
            setUserName(e.target.value)}} 
            placeHolder="aish123@gmail.com" 
            label={"Email"} 
        />

        <InputBox
            type="password" 
            onChange={(e) => {
              setPassword(e.target.value)
            }}  
            placeHolder="123456" 
            label={"Password"} 
         />

        {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        <div className="pt-4">
          <Button
            onClick={handleSignin} 
            label={"Sign in"}  
          />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

