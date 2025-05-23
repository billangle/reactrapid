import { createApi } from "@reduxjs/toolkit/query/react";
import { config } from "../../../../config/config";
import { axiosBaseQuery } from "../../../../_store/middleware/axiosBaseQuery";
import { IEmploymentHistory } from "../RequestType";

const BASE_URL = config.BASE_REVIEW_API_URL;

// initialize an empty api service that we'll inject endpoints into later as needed
export const employmentHistoryApi = createApi({
  reducerPath: "employmentHistoryApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/` }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getEmploymentHistory: builder.query<IEmploymentHistory, void>({
      query: () => ({ url: "employment_histories", method: "GET" }),
    }),
    updateEmploymentHistory: builder.mutation({
      query: (newEmploymentHistory) => ({
        url: `employment_histories`,
        method: "PUT",
        body: newEmploymentHistory,
      }),
    }),
  }),
});
