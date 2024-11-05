import {  Routes ,Route} from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage"
import Signup from "./Components/LandingPage/Signup";
import Login from "./Components/LandingPage/Login";
import { Toaster } from "react-hot-toast";
export default function App()
{
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        
      </Routes>
      <Toaster position="top-right" />
      </>
  )
}
