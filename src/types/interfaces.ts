export interface IProposalReviewer {
  proposalid: string;
  firmname: string;
  reviewertype: 'technical' | 'thirdparty' | string;
  reviewerdata: { reviewer: string }[];
  updatedBy: string;
  lastSavedDate: string;
}

export interface INDAData {
  reviewer?: string;
  formtype?: string;
  cnflctinfo?: ConflictInfo[];
  data?: any;
  success?: boolean;
}
interface ConflictInfo {
  cnflctIntrst: string;
  FirmName: string;
  FirmEIN: string;
  Topic: string;
  TopicID: string;
}

export interface ISystemUser {
  firstName: string;
  lastName: string;
  userName: string;
  actionDate?: string;
}
