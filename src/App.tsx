import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/movieDetails';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<
    string | number | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:3000/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setError('Could not load movies. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (selectedMovieId !== null) {
    return (
      <MovieDetails
        movieId ={selectedMovieId}
        onBack={() => setSelectedMovieId(null)}
      />
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div>
      <h1>Movies</h1>

      <MovieList
        movies={movies}
        onMovieClick={(id) => setSelectedMovieId(id)}
      />
    </div>
  );
}

export default App;