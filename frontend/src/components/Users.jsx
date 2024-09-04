
import { useEffect, useState } from "react";
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
export const Users = () => {
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("")

    useEffect(()=>{
        const token = localStorage.getItem("token");
        let loggedInUserId = "";

        if (token) {
            const decodedToken = jwtDecode(token);
            loggedInUserId = decodedToken.userId; // Assuming userId is part of the token payload
        }
     axios.get("https://paytm-1-0zk2.onrender.com/api/v1/user/bulk?filter=" + filter)
     .then(response=>{
      const filteredUsers = response.data.user.filter(user => user._id !== loggedInUserId);
      setUsers(filteredUsers)
     })
     .catch(error => {
        console.error("Error fetching users:", error);
    })
    },[filter])

    return <>
         

        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
                onChange={(e)=>{
                setFilter(e.target.value) }} 
                type="text" 
                placeholder="Search Users..." 
                className="w-full px-2 py-1 border rounded border-slate-200" 
            />
        </div>

        
        <div>
           {users.map(user=> <User user={user}/>)}

        </div>
        
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e)=>{
             navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}