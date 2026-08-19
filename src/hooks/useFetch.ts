import { useEffect, useState } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status >= 500) {
            throw new Error(
              'The server encountered an error. Please try again later.'
            );
          }

          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((result: T) => {
        setData(result);
      })
      .catch((error: Error) => {
        if (error.message.includes('Failed to fetch')) {
          setError(
            'Cannot connect to the API. Please make sure the server is running.'
          );
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;