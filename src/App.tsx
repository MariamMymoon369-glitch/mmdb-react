/*
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
*/


import { useState } from 'react';
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

  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

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
        <Route
          path="/movies/"
          element={
            <>
              <h1>Movies</h1>

              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {filteredMovies.length === 0 ? (
                <p>No movies match "{search}".</p>
              ) : (
                <MovieList movies={filteredMovies} />
              )}
            </>
          }
        />

        <Route path="/movies/:id" element={<MovieDetails />}/>

        <Route path="/" element={<MovieList movies={movies} />}/>


      </Routes>


    </div>
  );
}

export default App;