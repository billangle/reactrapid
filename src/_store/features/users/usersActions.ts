import { createAsyncThunk } from '@reduxjs/toolkit';
/*
import {
  getUserDetailsByEmail,
  sendRegistrationLinkViaEmail,
} from '../../api/usersApi';
*/
/*
export const sendRegistrationLink = createAsyncThunk<
  any,
  {
    email: string;
    name: string;
    requestCreatorUsername: string;
    firmEIN: string;
    returnUrl: string;
    lastSavedDate?: string;
  },
  { rejectValue: unknown }
>(
  'users/sendRegistrationLink',
  async (payload: {
    email: string;
    name: string;
    requestCreatorUsername: string;
    firmEIN: string;
    returnUrl: string;
    lastSavedDate?: string;
  }) => {
    try {
      const response = await sendRegistrationLinkViaEmail(payload);
      return response.data;
    } catch (error) {
      console.error('Failed to send registration link to ' + payload.email);
    }
  },
);

export const fetchUserDetailsByEmail = createAsyncThunk<
  any,
  string,
  { rejectValue: unknown }
>('users/getUserDetailsByEmail', async (email: string) => {
  try {
    const response = await getUserDetailsByEmail(email);
    return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
});
*/