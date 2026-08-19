import MovieCard from './MovieCard';
import { useNavigate } from 'react-router';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

interface MovieListProps {
  movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
  const navigate = useNavigate();

  const handleMovieClick = (id: string | number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={handleMovieClick}
        />
      ))}
    </div>
  );
}

export default MovieList;