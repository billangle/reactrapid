import { axios } from "../../../../utils/axios";
import { config } from "../../../../config/config";
import {
  IEmploymentHistoryRequest,
  IUpdateEmploymentHistoryRequest,
} from "../RequestType";
import { getIdToken } from "../../../../utils/auth";

const BASE_URL = config.API_BASE_URL;

export const getEmploymentHistoryRequest = async () => {
  console.log("Request : " + BASE_URL + " GET ");
  try {
    // const response = axios.get(`${BASE_URL}/employment_histories`);
    // return response;
    return;
  } catch (error) {
    throw new Error(`Error posting report request for : ${error}`);
  }
};

export const updateEmploymentHistoryRequest = async (
  postData: IUpdateEmploymentHistoryRequest
) => {
  console.log("Request : " + BASE_URL + " PUT: " + JSON.stringify(postData));
  try {
    const response = axios.put(`${BASE_URL}/rapid/send/message`, postData);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`Error posting report request for ${postData} : ${error}`);
  }
};
