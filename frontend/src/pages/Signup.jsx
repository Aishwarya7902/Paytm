
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate()
    const handleSignup = async () => {
        if (!username || !password || !lastName ||!firstName) {
          setErrorMessage("Something went wrong. Please try again.");
          return;
        }
    
        try {
          const response = await axios.post("https://paytm-1-0zk2.onrender.com/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
          });
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } catch (error) {
          setErrorMessage("Something went wrong. Please try again.");
        }
      };
    

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create your account"} />

                <InputBox 
                    type="text" 
                    onChange={(e) => {
                    setFirstName(e.target.value)}} 
                    placeHolder="John" 
                    label={"First Name"}
               />

                <InputBox 
                    type="text" 
                    onChange={(e) => {
                    setLastName(e.target.value)}} 
                    placeHolder="Doe" 
                    label={"Last Name"} 
                />

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
                    setPassword(e.target.value)}} 
                    placeHolder="123456" 
                    label={"Password"} 
                />
                
                {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
                <div className="pt-4">
                    <Button 
                    onClick={handleSignup}
                    label={"Signup"} 
                    />
                </div>

                <BottomWarning 
                 label={"Already have an account?"} 
                 buttonText={"Sign in"} 
                 to={"/signin"} 
                />
            </div>
        </div>
    </div>
}

