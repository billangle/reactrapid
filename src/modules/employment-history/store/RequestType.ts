export interface IEmploymentHistoryRequest {}

export interface IEmploymentHistory {
  companyName: string;
  salary: string;
  title: string;
  SSN: string;
  street1: string;
  city: string;
  state: string;
  zip: number;
}

export interface IUpdateEmploymentHistoryRequest {
  data: IEmploymentHistory;
}
export interface IUpdateEmploymentHistoryResponse {
  data: IEmploymentHistory;
}
