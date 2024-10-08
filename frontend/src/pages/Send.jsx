
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
export const Send = () => {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0)
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [isSuccess, setIsSuccess] = useState(false);
    const [balance, setBalance] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleTransfer = () => {
        if (amount > balance) {
            setErrorMessage("Insufficient balance!"); // Set an error message if the balance is insufficient
            setIsSuccess(false);
        } else {
            axios
                .post(
                    "https://paytm-1-0zk2.onrender.com/api/v1/account/transfer",
                    {
                        to: id,
                        amount,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    // Handle success
                    setIsSuccess(true);
                    setErrorMessage(""); // Clear any existing error messages
                })
                .catch((error) => {
                    // Handle error

                    setIsSuccess(false);
                    setErrorMessage("Failed to complete the transaction. Please try again."); // Set a generic error message
                });
        }
    };
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">

                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>

                <div className="p-6">

                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name.toUpperCase()}</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter Amount"

                            />
                        </div>

                        <button
                            onClick={handleTransfer}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">Initiate Transfer
                        </button>

                        {isSuccess && (
                            <div className="text-green-600 mt-4 text-center font-semibold">
                                Transfer successful!
                            </div>
                        )}
                        {errorMessage && (
                            <div className="text-red-600 mt-4 text-center font-semibold">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

