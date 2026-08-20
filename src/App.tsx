import { useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import MovieList from './components/MovieList';
import MovieDetails from './components/movieDetails';
import { Route, Routes, useSearchParams } from 'react-router';
import { WatchlistProvider, useWatchlist } from './context/watchListContext';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

function Header() {
  const { watchlist } = useWatchlist();
  return (
    <header>
      <h1>Movies</h1>
      <p>Watchlist: {watchlist.length} movies</p>
    </header>
  );
}

function App() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, loading, error } = useFetch<Movie[]>(
    `http://localhost:3000/movies?page=${page}&limit=${limit}`
  );

  const movies = data ?? [];

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

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
    <WatchlistProvider>
    <div>
      <Header />
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
                onChange={(event) => {
                  const value = event.target.value;
                  setSearchParams(value ? { search: value } : {});
                }}
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

        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>

    </div>
    </WatchlistProvider>
  );
}

export default App;