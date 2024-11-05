import Card from "./Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

function LandingPage() {
    const { authUser, isLoading } = useAuthContext();
	const {logout}= useLogout();
		const handleLogout	= async()=>{
		await logout()
	}
    
    // Show a loading state if auth data is still loading
    // if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-background min-h-screen">
            <div className="flex justify-around items-center pt-4 py-2 px-24 bg-top shadow-xl ">
                <h1 className="text-4xl 3xl:text-5xl font-koulen font-bold text-text ">
                    STREAMSAGE
                </h1>
                <div className="flex gap-20 items-center font-poppins font-medium text-xl 3xl:text-2xl  text-primary pt-1">
                    <h1>Home</h1>
                    <h1>Features</h1>
                    <h1>About</h1>
                </div>

                {authUser ? (
                    <div className="border-2 rounded-md py-2 px-3 border-primary text-primary font-poppins font-semibold text-md 3xl:text-lg hover:bg-slate-500 hover:cursor-pointer" onClick={handleLogout}>
                        LogOut
						
                    </div>
                ) : (
                    <div className="border-2 rounded-md py-2 px-3 border-primary text-primary font-poppins font-semibold text-md 3xl:text-lg">
                        <Link to="/signup">Sign up</Link>
                    </div>
                )}
            </div>

            <div className="mt-24">
                <h1 className="font-poppins font-bold text-4xl flex justify-center text-text lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
                    One Place To Track All Your
                </h1>
                <span className="font-poppins font-bold text-4xl flex justify-center gradient-text bg-clip-text from-grad-start to-grad-end lg:text-6xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl">
                    Favourites
                </span>
                <span className="font-poppins text-xl 3xl:text-2xl font-medium flex justify-center pt-9 text-text">
                    Discover your ultimate hub for favorites: a versatile site to manage
                    your watchlist,
                </span>
                <span className="font-poppins text-xl 3xl:text-2xl font-medium flex justify-center text-text">
                    track favorites, and get personalized show recommendations.
                </span>
            </div>

            <div className="flex justify-center">
                <button
                    type="button"
                    className="bg-primary font-poppins font-semibold text-xl 3xl:text-3xl flex justify-center py-2 px-11 rounded-lg mt-10"
                >
                    <Link to="/homepage">Get Started</Link>
                </button>
            </div>

            <div className="flex col-span-3 gap-12 3xl:px-72 px-52 py-24 justify-around items-center">
                {/* <Card img={Movie} genre={"Movies"} />
                <Card img={Drama} genre={"Drama"} />
                <Card img={WebSeries} genre={"Web Series"} />
                <Card img={Anime} genre={"Anime"} /> */}
            </div>
        </div>
    );
}

export default LandingPage;
