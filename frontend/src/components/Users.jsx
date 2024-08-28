import { Button } from "./Button"
export const Users = () => {
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>

        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-black">H</span>
            </div>
            <h3 className="text-2xl font-normal">Harkirat Singh</h3>
        </div>

        
    </>
}