import { useState, useEffect } from "react";

export const useDebounce = (searchValue: string, delay = 500) => {
  const [query, setQuery] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(searchValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, delay]);

  return query;
};
