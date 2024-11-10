import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface movieProps {
	name:string;
	original_name:string;
	backdrop_path: string;         // URL path to the backdrop image
	id: number;                    // Unique identifier for the movie
	title: string;                 // Movie title
	original_title: string;        // Original title of the movie
	overview: string;              // Brief description of the movie
	poster_path: string;           // URL path to the poster image
	media_type: string;           // Type of media (for this case, it's "movie")
	adult: boolean;                // Indicates if the movie is for adults
	original_language: string;     // Language code of the original language
	genre_ids: number[];           // Array of genre IDs
	popularity: number;            // Popularity score
	release_date: string;          // Release date of the movie
	video: boolean;                // Indicates if there’s an associated video
	vote_average: number;          // Average vote score
	vote_count: number;            // Total number of votes
}

interface myCarouselProps {
	movies: movieProps[];
  }

const MyCarousel = ({movies}:myCarouselProps) => {
	const [index, setIndex] = useState(0);
	const cardsPerView = 6;
	const length = movies.length;
	const {authUser}=useAuthContext();
	const userId= authUser? authUser.id:null;
	const navigate=  useNavigate()
	// const token = localStorage.getItem("token"); // Ensure token is retrieved from localStorage

	const goToTab=(movie:movieProps)=>{
		console.log(movie.id);
		toast(movie.original_title? movie.original_title:movie.name, {
			icon: '🎬',
		  });
	}

	const handlePrevious = () => {
		const newIndex = index - cardsPerView;
		setIndex(newIndex < 0 ? length - cardsPerView : newIndex);
	};

	const handleNext = () => {
		const newIndex = index + cardsPerView;
		setIndex(newIndex >= length ? 0 : newIndex);
	};
	const addToList = async (movie:movieProps) => {
		try {
		  if (!userId) {
			toast.error("User not authenticated. Please sign in.");
			return;
		  }
	  
		  const response = await axios.post(
			"http://localhost:3000/api/watchlist/add",
			{ movie, userId },
			{ withCredentials: true }  // Ensure cookies are sent with the request
		  );
	  
		  if (response.status === 202) {
			toast(`${movie.original_title? movie.original_title:movie.name	} already exists in watchlist!`, { icon: "🎞️" });
		  } else if (response.status === 201) {
			toast(`${movie.original_title? movie.original_title:movie.name	} added to watchlist!` , { icon: "✅" });
		  } else {
			toast.error("Failed to add movie to watchlist");
		  }
		} catch (error) {
		  toast.error("Failed to add movie to watchlist");
		  console.error("Error:", error);
		}
	  };

	// 

	return (
		<div className="flex items-center justify-center w-full relative bg-background">
			<button
				className="absolute left-0 p-2 border border-text bg-black bg-opacity-35 text-text font-poppins text-5xl rounded-lg hover:text-primary hover:border-primary focus:outline-none z-10"
				onClick={handlePrevious}
				type="button"
			>
				&lt;
			</button>

			<div className="flex overflow-hidden w-full">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(-${(index / cardsPerView) * 100}%)`,
					}}
				>
					{movies.map((movie:movieProps) => (
						<div key={movie.id} className="flex-shrink-0 w-1/6 p-1" onClick={()=>goToTab(movie)}>
							<div className="bg-gray-900 rounded-xl shadow-lg relative">
								<button
									type="button"
									className="absolute bottom-0 right-0 m-2 px-2 shadow-text shadow-sm bg-background rounded-lg font-poppins font-semibold text-text "
									onClick={() => {
										addToList(movie);
									}}
								>
									{" "}
									Add
								</button>
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.original_title? movie.original_title:movie.name}
									className="w-full h-80 object-cover rounded-xl shadow-lg "
								/>
							</div>
							<div className="pt-4">
								<span className="text-text text-sm font-poppins font-semibold">
									{movie.original_title? movie.original_title:movie.name }
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<button
				className="absolute right-0 p-2 border border-text bg-black bg-opacity-35 text-text font-poppins text-5xl rounded-lg hover:text-primary hover:border-primary focus:outline-none z-10"
				onClick={handleNext}
				type="button"
			>
				&gt;
			</button>
		</div>
	);
};

export default MyCarousel;
