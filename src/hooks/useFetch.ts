import { useEffect, useState } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        return response.json();
      })
      .then((result: T) => {
        setData(result);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }

        setError('Could not load data. Please try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;