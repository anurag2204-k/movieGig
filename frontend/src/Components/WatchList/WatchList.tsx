import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext"
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Popup from "../HomePage/Popup";
import Footer from "../HomePage/Footer";
import toast from "react-hot-toast";

interface movieProps {
    backdrop_path: string;         // URL path to the backdrop image
    id: string;                    // Unique identifier for the movie
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




const WatchList = () => {
    const { authUser } = useAuthContext();
    const userId = authUser ? authUser.id : null;
    const [loading, setLoading] = useState(false);
    const [ray, setRay] = useState<movieProps[]>([])
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [movieRemove,setMovieRemove] = useState(false);



    const removeItem = async (itemId: string) => {
        
        try {
            const res = await axios.put("http://localhost:3000/api/watchlist/remove", {
                id: itemId
            }, {
                withCredentials: true
            });

            if (res.status === 200) {
                console.log(res.data)
                toast.success("Movie removed from watchlist")
            }

        } catch (error) {
            console.error(error)
            toast.error("Failed to remove movie from watchlist")
        } finally {
            setMovieRemove(!movieRemove)
        }
    }


    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/api/watchlist/list", {
                    withCredentials: true,
                });


                if (res.status === 200) {
                    const sortedMovies = res.data.sort((a: movieProps, b: movieProps) => b.popularity - a.popularity);
                
                    setRay(sortedMovies); // Set the movie data into the state

                }
            } catch (error) {
                console.error("Error in list function:", error);
            } finally {
                setLoading(false);
                console.log("raoy", ray) // End loading state
            }
        };

        if (userId) {
            getList();
        }
    }, [userId,movieRemove]);

    


    return (
        <div className="min-h-screen bg-background">
            <Navbar
                setIsMenuVisible={setIsMenuVisible}
                isMenuVisible={isMenuVisible}
            />
            {isMenuVisible && <Popup />}

            <div className="flex justify-center p-10">
                <h1 className="">Your Watchlist</h1>
                {ray.length === 0 ? (
                    <p>No movies in your watchlist.</p>
                ) : (
                    <div>
                        {ray.map((movie: movieProps) => (

                            <div key={movie.id} className="m-5">

                                <div
                                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        console.log('Movie info:', movie.title);
                                    }}
                                >
                                    <img
                                        className="object-cover h-96 w-auto rounded-t-lg p-3 md:p-0 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <div>
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.original_title}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
                                        </div>
                                        <div className="flex items-stretch justify-around py-5">
                                            <div className="px-5 flex-row">
                                                <div className="text-gray-400">
                                                    Popularity
                                                </div>
                                                <div className="px-5 py-1 text-gray-300">
                                                    {movie.popularity}
                                                </div>
                                            </div>

                                            <div
                                                className="self-center flex-1 text-red-300 border border-gray-400 rounded text-center px-4 py-2 m-2 md:max-w-32 hover:cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault()
                                                    console.log('Remove movie:', movie.title);
                                                    removeItem(movie.id)
                                                }}
                                            >
                                                Remove
                                            </div>
                                        </div>
                                    </div>
                                </div>









                            </div>

                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );


}
export default WatchList

