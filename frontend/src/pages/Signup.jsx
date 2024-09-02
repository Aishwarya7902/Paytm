
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"


export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create your account"} />

                <InputBox 
                    onChange={(e) => {
                    setFirstName(e.target.value)}} 
                    placeHolder="John" 
                    label={"First Name"}
               />

                <InputBox 
                    onChange={(e) => {
                    setLastName(e.target.value)}} 
                    placeHolder="Doe" 
                    label={"Last Name"} 
                />

                <InputBox 
                    onChange={(e) => {
                    setUserName(e.target.value)}} 
                    placeHolder="aish123@gmail.com" 
                    label={"Email"} 
                />

                <InputBox 
                    onChange={(e) => {
                    setPassword(e.target.value)}} 
                    placeHolder="123456" 
                    label={"Password"} 
                />

                <div className="pt-4">
                    <Button 
                    onClick={(e)=>{
                        axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                    }}
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

