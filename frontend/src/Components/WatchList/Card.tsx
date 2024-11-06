

interface movieProps {
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

interface CardProps {
    movie: movieProps;
  }
  
  const Card = (movie:movieProps) => {
    return (
      <div key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    );
  };