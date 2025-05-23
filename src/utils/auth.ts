import { Auth } from 'aws-amplify';
import { RootState } from '../_store/store';
import { useAppSelector } from '../_store/hooks';

export const getIdToken = async () => {
  // Get the current user session from AWS Amplify
  const session = await Auth.currentSession();
  if (!session) {
    return null;
  }
  // Retrieve the access token from the user session
  const idToken = session.getIdToken().getJwtToken();
  return idToken;
};

// Check if the current session exists in the local storage
export const getSession = async () => {
  try {
    const session = await Auth.currentSession();
    if (session) return session;
  } catch (error) {
    return false;
  }
};

export const CheckLoggedInLocalStorage = () => {
  const UserDetails: any = useAppSelector((state) => state.auth.user);
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const clearLoggedInInfoInLocalStorage = () => {
  localStorage.removeItem('isLoggedIn');
};

export const setLoggedInLocalStorage = () => {
  localStorage.setItem('isLoggedIn', 'true');
};
