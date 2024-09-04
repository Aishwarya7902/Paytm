import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const Balance = ({value})=>{
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Fetch the balance using the userId
      axios.get(`http://localhost:3000/api/v1/account/balance`,{
        params: { userId: userId }
      })
        .then(response => {
          console.log(response.data);
          setBalance(response.data.balance);  // Assuming the response has a `balance` field
        })
        .catch(error => {
          console.error("There was an error fetching the balance!", error);
        });
    }
  }, []);
  
  return <div className="flex">
      <div className="font-bold text-lg">
        Your Balance
      </div>
      <div className="font-semibold ml-4 text-lg">
         
         Rs {balance}
      </div>
  </div>
}