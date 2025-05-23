import { useEffect, useState } from 'react';
import { axios } from '../utils/axios';

export type FetchDataResult<T> = {
  data?: T;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
};

export function useFetchData<T>(
  url: string,
  cachedData: React.MutableRefObject<any> | null = null,
): FetchDataResult<T> {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (!cachedData || (cachedData && !cachedData?.current)) {
        axios.get<T>(url).then((res) => {
          setData(res.data);
          if (cachedData) {
            cachedData.current = res.data;
          }
        });
      } else {
        setData(cachedData?.current);
      }
    } catch (fetchError) {
      setError(fetchError);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
}
