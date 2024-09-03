
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"
import { Signin } from "../pages/Signin";
export const Appbar = () => {
    const navigate=useNavigate();

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            {/* <div className="flex flex-col justify-center h-full ml-4">
            Hello!
            </div> */}
            {/* <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                  
                </div>
            </div> */}
            <Button onClick={()=>{
             localStorage.removeItem("token");
             navigate("/signin")

            }} label={"Log Out"} />
        </div>

    </div>
}