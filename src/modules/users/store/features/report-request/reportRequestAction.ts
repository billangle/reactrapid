import { createAsyncThunk } from '@reduxjs/toolkit';
import {
 postReportRequest,
 getReportStatusRequest
} from '../../api/reportRequestApi';
import { IReportRequest } from '../../../RequestType';


export const postReport = createAsyncThunk(
    '/report-request/postReportRequest',
  async (payload: IReportRequest) => {
    try {
      const response = await postReportRequest(payload);
      return response.data;
    } catch (error) {
      throw new Error('failed to save response');
    }
  },
);

export const reportStatus = createAsyncThunk(
  '/report-request/reportStatusRequest',
async (payload: string) => {
  try {
    const response = await getReportStatusRequest(payload);
    return response.data;
  } catch (error) {
    throw new Error('failed to save response');
  }
},
);

