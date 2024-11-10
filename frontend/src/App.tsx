import {  Routes ,Route} from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage"
import Signup from "./Components/LandingPage/Signup";
import Login from "./Components/LandingPage/Login";
import HomePage from "./Components/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
import WatchList from "./Components/WatchList/WatchList";
export default function App()
{
 
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/watchlist" element={<WatchList/>}/>
      </Routes>
      <Toaster position="top-right" />
      </>
  )
}
