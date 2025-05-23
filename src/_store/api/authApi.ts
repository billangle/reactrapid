import { Auth } from 'aws-amplify';
import { config } from '../../config/config';

export const login = async (userName: string, password: string) => {
  try {
    const response = false
      ? await Auth.currentAuthenticatedUser()
      : await Auth.signIn(userName, password);
    return response;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
