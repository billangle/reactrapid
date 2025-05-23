import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from '../../config/config';
import { axiosBaseQuery } from './axiosBaseQuery';

const BASE_URL = config.BASE_REVIEW_API_URL;
export const sharedApi = createApi({
  reducerPath: 'sharedApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/` }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
