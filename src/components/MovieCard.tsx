import {useWatchlist} from '../context/watchListContext';

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
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };
  
  return (
    <div onClick={() => onClick(movie.id)}>
      <img src={movie.posterUrl} alt={movie.title} width="150" />
      <h2>{movie.title}</h2>
      <p>{movie.releaseYear}</p>
      <button onClick={handleWatchlistClick}>
        {isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
}

export default MovieCard;