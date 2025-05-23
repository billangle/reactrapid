import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAgency,
  fetchUSStates,
  uploadContractFile,
  uploadFile,
  uploadFileWithBucketKey,
  uploadFileToS3,
} from '../../api/commonApi';
import {
  ContractFileUploadPayload,
  ContractFileUploadPayloadUpdated,
  ContractFileUploadWithBucketKey,
} from './types';


export const getAgency = createAsyncThunk('APP_GET_AGENCY', async () => {
  try {
    const response = await fetchAgency();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getUSStates = createAsyncThunk('APP_GET_USSTATES', async () => {
  try {
    const response = await fetchUSStates();
    return response.data;
  } catch (error) {
    throw error;
  }
});


/**
 * Call the endpoint for upload the real file to S3
 */
export const uploadDocument = createAsyncThunk(
  'app/uploadDocument',
  async (payload: ContractFileUploadPayload) => {
    try {
      // Upload file to S3
      const response = await uploadFile(payload);
      return response;
    } catch (error) {
      // Handle the error
      console.error('Failed to upload file', error);
    }
  },
);
export const uploadDocumentToS3 = createAsyncThunk(
  'app/uploadDocumentToS3',
  async (data: { key: string; file: File }) => {
    try {
      // Upload file to S3
      const response = await uploadFileToS3(data.key, data.file);
      return response;
    } catch (error) {
      // Handle the error
      console.error('Failed to upload file', error);
    }
  },
);

/**
 * Use for R6
 * Call the endpoint for upload the real file to S3
 */
export const uploadContractDocument = createAsyncThunk<
  { filePath: string; uploadedDate: string },
  ContractFileUploadPayloadUpdated
>(
  'app/uploadContractDocument',
  async (payload: ContractFileUploadPayloadUpdated, thApi) => {
    try {
      // Upload file to S3
      await uploadContractFile(payload);
      return {
        filePath: `${payload.solicitation}/${payload.proposalId}/${payload.file.name}`,
        uploadedDate: new Date().toISOString(),
      };
    } catch (error) {
      // Handle the error
      console.error('Failed to upload file', error);
      return thApi.rejectWithValue(error);
    }
  },
);

/**
 * Use for R6
 * Call the endpoint for upload the file to S3 with bucket key
 */
export const uploadContractFileByBucketKey = createAsyncThunk<
  { filePath: string; uploadedDate: string },
  ContractFileUploadWithBucketKey
>(
  'app/uploadContractFileByBucketKey',
  async (payload: ContractFileUploadWithBucketKey, thApi) => {
    try {
      // Upload file to S3
      await uploadFileWithBucketKey(payload);
      return {
        filePath: `${payload.bucketKey}/${payload.file.name}`,
        uploadedDate: new Date().toISOString(),
      };
    } catch (error) {
      // Handle the error
      throw new Error('Failed to upload file');
    }
  },
);
