import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

interface Movie {
  id: string | number | null;
  posterUrl: string;
  title: string;
  releaseYear: number;
  runtimeMinutes: number;
  overview: string;
}

function MovieDetails() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setMovie(null);
      setLoading(false);
      setError('No movie selected.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }

        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {
        setError('Could not load movie. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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

  const hours = Math.floor(movie.runtimeMinutes / 60);
  const minutes = movie.runtimeMinutes % 60;

  return (
    <div>
      <button onClick={() => navigate('/movies/')}>← Back</button>

      <img src={movie.posterUrl} alt={movie.title} width="300" />

      <h1>{movie.title}</h1>

      <p>{movie.releaseYear}</p>

      <p>
        {hours}h {minutes}m
      </p>

      <p>{movie.overview}</p>

      <p>Movie ID: {movie.id}</p>
    </div>
  );
}

export default MovieDetails;