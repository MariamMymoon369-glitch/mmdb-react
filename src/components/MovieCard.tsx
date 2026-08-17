interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <img src={movie.posterUrl} alt={movie.title} width="150" />
      <h2>{movie.title}</h2>
      <p>{movie.releaseYear}</p>
    </div>
  );
}

export default MovieCard;