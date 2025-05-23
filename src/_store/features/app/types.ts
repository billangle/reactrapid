
import { GUID } from '../../../types/types';

export interface IMessage {
  type: 'error' | 'success';
  message: string;
  id: GUID;
}



export interface ContractFileUploadPayload {
  userName: string;
  //formName: DOCUMENT_UPLOAD_FORM_TYPES;
  file: File;
  ContractNumber?: string;
  Solicitation: string;
  //FormType: DOCUMENT_UPLOAD_FORM_TYPES;
  ProposalId: string;
}

/**
 * Upload Document payload type for R6
 * Currently it is being used for single file upload
 */
export interface ContractFileUploadPayloadUpdated {
 // formName: DOCUMENT_UPLOAD_FORM_TYPES;
  file: File;
  contractNumber?: string;
  solicitation: string;
  proposalId: string;
}

/**
 * Upload Document payload type for R6
 * Currently it is being used for multiple file upload
 */
export interface ContractFileUploadWithBucketKey {
  bucketKey: string;
  file: File;
}
