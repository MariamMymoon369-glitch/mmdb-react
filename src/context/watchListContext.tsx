import { createContext, useContext, useState, type ReactNode } from 'react';

interface Movie {
  id: string | number;
  posterUrl: string;
  title: string;
  releaseYear: number;
}

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string | number) => void;
  isInWatchlist: (id: string | number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((current) => [...current, movie]);
  };

  const removeFromWatchlist = (id: string | number) => {
    setWatchlist((current) =>
      current.filter((movie) => movie.id !== id),
    );
  };

  const isInWatchlist = (id: string | number) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider');
  }

  return context;
}