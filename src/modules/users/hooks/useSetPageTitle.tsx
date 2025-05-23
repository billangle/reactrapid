import { useEffect } from 'react';
import { useAppDispatch } from '../../../_store/hooks';
import { setPageTitle } from '../../../_store/features/app/appSlice';

function useSetPageTitle(title: string) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle(title));
  }, []);
}

export default useSetPageTitle;
