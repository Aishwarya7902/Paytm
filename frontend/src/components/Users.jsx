
import { Button } from "./Button"
export const Users = () => {
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input  type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>

        
        <div>
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    H
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    Harkirat Singh
                </div>
            </div>
        </div>
        </div>
        
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
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
             navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}