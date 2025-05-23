import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from './authSlice';
// eslint-disable-next-line import/named
import { setLoggedInLocalStorage } from '../../../utils/auth';
import { login } from '../../api/authApi';
import {
  AuthUser
} from './authTypes';
import { setReportEmail } from '../app/appSlice';
import { custom } from 'zod';
import { Auth } from 'aws-amplify';

export const doLogin = createAsyncThunk(
  'auth/doLogin',
  async (
    { username, password }: { username: string; password: string },
    { dispatch },
  ) => {
    try {
      const response = await login(username, password);
      const {
        signInUserSession: { accessToken, idToken },
      } = response;

      const session = await Auth.currentSession();
      //console.log('RAW Access Token:', session.getIdToken().getJwtToken());
      const rawJwtToken = session.getIdToken().getJwtToken();

    
      let groups = idToken.payload['cognito:groups'].toString();

      let isAdmin = false;
      if (groups === "Admins") {
        isAdmin = true;
      }
      const userObj: AuthUser = {
        isLoggedIn: true,
        accessToken: rawJwtToken,
    //        accessToken: accessToken.jwtToken,
        idToken: idToken.jwtToken,
      //  roles: idToken.payload['cognito:groups'],
        username: idToken.payload['cognito:username'],
        name: `${idToken.payload['custom:prefix'] || ''} ${idToken.payload['custom:firstName']} ${idToken.payload['custom:middleName'] || ''} ${idToken.payload['custom:lastName']} ${idToken.payload['custom:suffix'] || ''}`,
        email: idToken.payload.email,
        phoneNumber: idToken.payload['custom:phone'],
        givenName: idToken.payload['custom:firstName'],
        familyName: idToken.payload['custom:lastName'],
        profile: idToken.payload.profile,
        isSuperUser:isAdmin,
        isGovtEmployee: false,
        street1: idToken.payload['custom:street1'],
        street2: idToken.payload['custom:street2'],
        city: idToken.payload['custom:city'],
        state: idToken.payload['custom:state'],
        zip: idToken.payload['custom:zip'],
        apt: idToken.payload['custom:apt'],
        confirmEmail: idToken.payload['custom:confirmEmail'],
        middlename: idToken.payload['custom:middleName'],
        prefix: idToken.payload['custom:prefix'],
        suffix: idToken.payload['custom:suffix'],
        challengeAnswer: idToken.payload['custom:challengeAnswer'],
        challengeQuestion: idToken.payload['custom:challengeQuestion'],


  
      };
      console.log('ID TOKEN', idToken); 
      //console.log('doLogin userObj:', userObj); 
      
      dispatch(setUser(userObj));
      dispatch(setReportEmail(userObj.email));
      setLoggedInLocalStorage();
      return userObj;
    } catch (error: any) {
      // Handle the error
      console.error('doLogin error:', error);
      throw new Error(error.message);
    }
  },
);
