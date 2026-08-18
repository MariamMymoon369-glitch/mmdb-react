import MovieCard from './MovieCard';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (id: string | number) => void;
}

function MovieList({ movies, onMovieClick }: MovieListProps) {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
}

export default MovieList;