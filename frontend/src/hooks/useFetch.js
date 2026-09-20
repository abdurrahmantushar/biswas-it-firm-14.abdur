import { useCallback, useEffect, useState } from "react";

const useFetch = (fetchFunction, options = {}) => {
  const { immediate = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(...args);

        setData(result);

        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute().catch(() => {});
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
  };
};

export default useFetch;