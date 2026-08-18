interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string | number) => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div onClick={() => onClick(movie.id)}>
      <img src={movie.posterUrl} alt={movie.title} width="150" />
      <h2>{movie.title}</h2>
      <p>{movie.releaseYear}</p>
    </div>
  );
}

export default MovieCard;