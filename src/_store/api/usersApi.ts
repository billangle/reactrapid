import { config } from '../../config/config';
import { axios } from '../../utils/axios';
const BASE_URL = config.BASE_SUBMISSION_API_URL;
export const sendRegistrationLinkViaEmail = async (payload: {
  email: string;
  name: string;
  requestCreatorUsername: string;
  firmEIN: string;
  returnUrl: string;
  lastSavedDate?: string;
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/regemail`, payload);
    return response;
  } catch (error) {
    throw new Error('Failed to send registration link to ' + payload.email);
  }
};


