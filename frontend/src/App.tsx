import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage"
import HomePage from "../pages/HomePage"
import WatchList from "../pages/WatchList"
import SingIn from "../pages/SignIn"
import Signup from "../pages/Signup"


function App() {
  return(
    <>
    <BrowserRouter>
			<Routes>
      <Route path="/" element={<LandingPage />} />
				<Route path="homepage" element={<HomePage />} />
				<Route path="watchlist" element={<WatchList />} />
				<Route path="singin" element={<SingIn />} />
				<Route path="signup" element={<Signup />} />
			</Routes>
      </BrowserRouter>
		</>
  )
}

export default App
