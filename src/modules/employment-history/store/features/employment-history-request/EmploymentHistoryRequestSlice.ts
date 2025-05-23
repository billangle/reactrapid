import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getEmploymentHistory,
  updateEmploymentHistory,
} from "./EmploymentHistoryRequestAction";
import {
  IEmploymentHistory,
  IUpdateEmploymentHistoryRequest,
  IUpdateEmploymentHistoryResponse,
} from "../../RequestType";

export interface IInitialState {
  data: IEmploymentHistory;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: IInitialState = {
  data: {
    companyName: "string",
    salary: "string",
    title: "string",
    SSN: "string",
    street1: "string",
    city: "string",
    state: "string",
    zip: -1,
  },
  status: "idle",
  error: null,
};

console.log("does this ever run");

export const employmentHistorySlice = createSlice({
  name: "employmenthistoryrequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmploymentHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEmploymentHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
       // state.data = action.payload;
        state.error = null;
      })
      .addCase(getEmploymentHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch employment history";
      });

    builder
      .addCase(updateEmploymentHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEmploymentHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateEmploymentHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Post employment history failed";
      });
  },
});

export default employmentHistorySlice.reducer;
