import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from '../../../../config/config';
import { axiosBaseQuery } from '../../../../_store/middleware/axiosBaseQuery';

const BASE_URL = config.BASE_REVIEW_API_URL;

// initialize an empty api service that we'll inject endpoints into later as needed
export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/` }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
