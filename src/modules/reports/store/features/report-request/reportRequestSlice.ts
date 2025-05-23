import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  postReport
} from './reportRequestAction';
import { IReportRequest, IReportRequestResponse} from '../../../RequestType';

interface IInitialState {
  reportRequestData: IReportRequestResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
  email: string;
  reportType: string;
  isExistPendingReportRequest: boolean;
}

const initialState: IInitialState = {
  reportRequestData: [],
  status: 'idle',
  error: null,
  email: '',
  reportType: '',
  isExistPendingReportRequest: false,
};

export const reportRequestSlice = createSlice({
  name: 'reportrequest',
  initialState,
  reducers: {
    updateReportRequestData(
      state,
      action: PayloadAction<IReportRequest>,
    ) {
      const { email, reportType, ...report} = action.payload;
      const index = state.reportRequestData.findIndex(
        (el) => el.Email === email && el.ReportType === reportType,
      );
      if (index !== -1) {
        state.reportRequestData[index] = {
          ...state.reportRequestData[index],
          ...report,
        };
      }
      /*
      state.isExistPendingReportRequest = state.reportRequestData?.some(
        (rd) => rd.Result === state.pending,
      );
      */
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(postReport.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(postReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = true;
      });
  },
});
export const { updateReportRequestData } = reportRequestSlice.actions;
export default reportRequestSlice.reducer;
