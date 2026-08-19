import './App.css';
import useFetch from './hooks/useFetch';
import MovieList from './components/MovieList';
import MovieDetails from './components/movieDetails';
import { Routes, Route } from 'react-router';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

function App() {
  const { data, loading, error } = useFetch<Movie[]>(
    'http://localhost:3000/movies'
  );

  const movies = data ?? [];

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
      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/" element={<MovieList movies={movies} />} />

      </Routes>
    </div>
  );
}

export default App;