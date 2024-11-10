import { useState, useEffect } from "react";
import MyCarousel from "./MyCarousel";
import axios from "axios";

interface MovieProps {
  name: string;
  original_name:string;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingProps {
    what: string; // Declare 'what' as a prop for the Trending component
  }

const Trending = ({what}:TrendingProps) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const url = "https://api.themoviedb.org/3/"+what
        const { data } = await axios.get(
          url,
          {
            params: { api_key: import.meta.env.VITE_API_KEY },
          }
        );
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("An error occurred while fetching trending movies.", error);
        setError("An error occurred while fetching trending movies.");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue
  }

  return <MyCarousel movies={movies} />; // Pass the movies data to MyCarousel
};

export default Trending;
