export type PetsOption<T = string> = {
  label: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  id?: number | string;
};

export enum HTTP_RESPONSE_CODE {
  NO_CONTENT = 204,
}

export type GUID = string;

export type Date = { mm: string; dd: string; yyyy: string };

export type Dictionary<T> = {
  [key: string]: T;
};

export interface PaginatedQueryParams {
  page: number;
  pageSize: number;
}

export enum LOCAL_STORAGE_KEYS {
  REVIEW_SOLICITATION = 'review-solicitation',
}

export interface PaginatedResponse<T> {
  count: number;
  content: T[];
}

export interface IPDFDocumentResponse {
  key: string;
  ein: string;
  topicId: string;
  url: string;
  expiresSeconds: string;
}
