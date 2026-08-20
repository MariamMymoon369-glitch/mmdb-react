import { useNavigate, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';

interface Movie {
  id: string | number | null;
  posterUrl: string;
  title: string;
  releaseYear: number;
  runtimeMinutes: number | null;
  overview: string | null;
  language: string | null;
}

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: movie,
    loading,
    error,
  } = useFetch<Movie>(
    `http://localhost:3000/movies/${id}`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <button onClick={() => navigate('/movies/')}>← Back</button>
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <button onClick={() => navigate('/movies/')}>← Back</button>
        <p>Movie not found.</p>
      </div>
    );
  }

  const runtime = movie.runtimeMinutes;
  const runtimeDisplay =
    runtime === null
      ? 'Runtime unavailable'
      : `${Math.floor(runtime / 60)}h ${runtime % 60}m`;

  return (
    <div>
      <button onClick={() => navigate('/movies/')}>← Back</button>

      <img
        src={movie.posterUrl}
        alt={movie.title}
        width="300"
      />

      <h1>{movie.title}</h1>

      <p>{movie.releaseYear}</p>

      <p>{runtimeDisplay}</p>

      <p>{movie.overview}</p>

      <p>{movie.language}</p>

      <p>Movie ID: {movie.id}</p>
    </div>
  );
}

export default MovieDetails;