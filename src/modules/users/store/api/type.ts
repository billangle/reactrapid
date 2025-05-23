import { AxiosResponse } from 'axios';
import { FileUploadForms } from './enums';

export interface ApiResponse<T> {
  payload: AxiosResponse | any;
  meta: {
    arg: T;
    requestId: string;
    requestStatus: string;
  };
  type: any;
}



