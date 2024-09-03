import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Send } from "./pages/Send"
import { Signin } from "./pages/Signin"
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
          />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
          />
          <Route path="/send" element={<Send />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
