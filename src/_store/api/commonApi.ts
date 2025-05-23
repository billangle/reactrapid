import { Auth, Storage } from 'aws-amplify';
import { axios } from '../../utils/axios';
import { config } from '../../config/config';
import {
  ContractFileUploadPayload,
  ContractFileUploadPayloadUpdated,
  ContractFileUploadWithBucketKey,
} from '../features/app/types';
const BASE_URL = config.BASE_SUBMISSION_API_URL;

export const fetchAgency = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reference/agency`);
    return response;
  } catch (error) {
    throw new Error('Failed');
  }
};

export const fetchUSStates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reference/usstates`);
    return response;
  } catch (error) {
    throw new Error('Failed');
  }
};

/**
 * @deprecated
 * Deprecating this due to we are using Camel Case
 */
export const uploadFile = async (payload: ContractFileUploadPayload) => {
  try {
    const response = await Storage.put(
      `${payload.Solicitation}/${payload.ProposalId}/${payload.file.name}`,
      payload.file,
    );
    return response;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};
export const uploadFileToS3 = async (key: string, file: File) => {
  try {
    const response = await Storage.put(
      key,
      file,
      // {bucket:'prosams-temp'}
    );
    return response;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};

export const uploadContractFile = async (
  payload: ContractFileUploadPayloadUpdated,
) => {
  try {
    const response = await Storage.put(
      `${payload.solicitation}/${payload.proposalId}/${payload.file.name}`,
      payload.file,
    );
    return response;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};

export const uploadFileWithBucketKey = async (
  payload: ContractFileUploadWithBucketKey,
) => {
  try {
    const response = await Storage.put(
      `${payload.bucketKey}/${payload.file.name}`,
      payload.file,
    );
    return response;
  } catch (error) {
    throw new Error('Failed to upload file');
  }
};

export const getFileURL = async (payload: { filePath: string }) => {
  try {
    const fileURL = await Storage.get(payload.filePath, {});
    return fileURL;
  } catch (error) {
    throw new Error('Failed to get file');
  }
};

export const fetchSolicitation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/eval/utilities/solicitation`);
    return response;
  } catch (error) {
    throw new Error('Failed to get Solicitation');
  }
};

export const fetchProposals = async (sutTopic: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/eval/utilities/proposallist/${sutTopic}`,
    );
    return response;
  } catch (error) {
    throw new Error('Failed to get Proposals');
  }
};

export const submitDocumentUploadData = async (
  payload: ContractFileUploadPayload, // Another type can be added in further
) => {
  try {
    const docData = {
      ContractNumber: payload.ContractNumber,
      FormType: "",
      FileName: payload.file.name,
      FileSize: `${payload.file.size}`,
      ProposalId: payload.ProposalId,
    };
    const response = await axios.put(
      `${BASE_URL}/contracts/document-upload`,
      docData,
    );
    return response;
  } catch (error) {
    throw new Error('Failed to submit document data upload');
  }
};
