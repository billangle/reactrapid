import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmploymentHistoryRequest,
  updateEmploymentHistoryRequest,
} from "../../api/employmentHistoryRequestApi";
import { IUpdateEmploymentHistoryRequest } from "../../RequestType";

export const getEmploymentHistory = createAsyncThunk(
  "/employment-history-request/getEmploymentHistoryRequest",
  async () => {
    try {
      const response = await getEmploymentHistoryRequest();
      return response;
    } catch (error) {
      throw new Error("failed to get employment history");
    }
  }
);

export const updateEmploymentHistory = createAsyncThunk(
  "/employment-history-request/updateEmploymentHistoryRequest",
  async (payload: IUpdateEmploymentHistoryRequest) => {
    try {
      console.log("firing inside the update employment history");
      const response = await updateEmploymentHistoryRequest(payload);
      return response.data;
    } catch (error) {
      throw new Error("failed to update employment history");
    }
  }
);
