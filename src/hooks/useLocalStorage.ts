import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [data, setData] = useState(() => {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)();
      } else return initialValue;
    } else {
      return JSON.parse(jsonData);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData] as [T, typeof setData];
}

export default useLocalStorage;
