import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const Balance = ()=>{
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    // Fetch the logged-in user's balance
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .get("https://paytm-1-0zk2.onrender.com/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                setBalance(response.data.balance); // Assuming the response has a `balance` field
            })
            .catch((error) => {
                console.error("There was an error fetching the balance!", error);
            });
    }
}, []);
  
  return <div className="flex">
      <div className="font-bold text-lg">
        Your Balance
      </div>
      <div className="font-semibold ml-4 text-lg">
         
         Rs {balance.toFixed(2)}
      </div>
  </div>
}