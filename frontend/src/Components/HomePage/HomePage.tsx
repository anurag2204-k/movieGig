import {useState} from "react";
import Popup from "./Popup";
import Navbar from "./Navbar";
import Trending from "./Trending"
import Footer from "./Footer";
export default function HomePage(){
    const [isMenuVisible, setIsMenuVisible] = useState(false);
return (
    <div className="min-h-screen bg-background">
        <Navbar
				setIsMenuVisible={setIsMenuVisible}
				isMenuVisible={isMenuVisible}
			/>
            {isMenuVisible && <Popup />}
            <div>
				<h1 className="font-poppins font-bold text-6xl text-text flex justify-center pt-20 ">
					{" "}
					Trending this Week{" "}
				</h1>

				<div className="flex 3xl:px-32 px-6 pt-20 ">
					<Trending what={"trending/all/week"}/>
				</div>
			</div>
            <div>
				<h1 className="font-poppins font-bold text-6xl text-text flex justify-center pt-20 ">
					{" "}
					Trending Today{" "}
				</h1>

				<div className="flex 3xl:px-32 px-6 pt-20 ">
					<Trending what={"trending/all/day"}/>
				</div>
			</div>
            <div className="pt-32">
				<div className="flex">
					<div className="bg-primary w-2 text-primary ml-10"> </div>
					<h1 className="font-poppins font-bold text-3xl text-text ml-5">
						{" "}
						Top Movies
					</h1>
				</div>

				<div className="flex 3xl:px-32 px-6 pt-12 ">
					<Trending what={"trending/movie/week"} />
				</div>
			</div>
            <div className="pt-32">
				<div className="flex">
					<div className="bg-primary w-2 text-primary ml-10"> </div>
					<h1 className="font-poppins font-bold text-3xl text-text ml-5">
						{" "}
						Top Tv
					</h1>
				</div>

				<div className="flex 3xl:px-32 px-6 pt-12 ">
					<Trending what="tv/top_rated" />
				</div>
			</div>
            <div className="pt-32">
				<div className="flex">
					<div className="bg-primary w-2 text-primary ml-10"> </div>
					<h1 className="font-poppins font-bold text-3xl text-text ml-5">
						{" "}
						Upcoming 
					</h1>
				</div>

				<div className="flex 3xl:px-32 px-6 pt-12 ">
					<Trending what="tv/on_the_air" />
				</div>
			</div>
            
            <Footer/>
            
    </div>
)
}