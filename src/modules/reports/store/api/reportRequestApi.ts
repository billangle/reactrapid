import { IReportRequest } from '../../RequestType';
import { axios } from '../../../../utils/axios';
import { config } from '../../../../config/config';
const BASE_URL = config.BASE_REPORT_API_URL;

export const postReportRequest = async (postData: IReportRequest) => {
  console.log ("Request : " + BASE_URL + " POST: " + JSON.stringify(postData) );
  try {
    const response = axios.post(
      `${BASE_URL}/report/request/${postData.reportType}`,
      postData,
    );
    return await response;
  } catch (error) {
    throw new Error(`Error posting report request for ${postData.reportType} : ${error}`);
  }
};

export const getReportStatusRequest = async (uuid: string) => {
  console.log ("Request : " + BASE_URL + " uuid: " + uuid);
  try {
    const response = axios.get(
      `${BASE_URL}/status/requestid/${uuid}`,
    );
    return await response;
  } catch (error) {
    throw new Error(`Error getting report status for ${uuid} : ${error}`);
  }
};

