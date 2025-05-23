import { Middleware } from '@reduxjs/toolkit';
import { getSession } from '../../utils/auth';
import { initialUserState, setUser } from '../features/auth/authSlice';


const initMiddleware: Middleware = (store) => (next) => async (action) => {
  // Check if the action type is the app initialization action
  if (action.type === 'app/appInitialized') {
    const currentSession: any = await getSession();
    if (currentSession) {
      const { accessToken, idToken } = currentSession;
     // const roles: USER_ROLES[] = idToken.payload['cognito:groups'];
     
      let groups = idToken.payload['cognito:groups'].toString();

      let isAdmin = false;
      if (groups === "Admins") {
        isAdmin = true;
      }
     store.dispatch(
        setUser({
          isLoggedIn: true,
          isSuperUser: isAdmin,
          accessToken: accessToken.jwtToken,
          idToken: idToken.jwtToken,
          username: idToken.payload['cognito:username'],
          name: `${idToken.payload['custom:prefix'] || ''} ${idToken.payload['custom:firstName']} ${idToken.payload['custom:middleName'] || ''} ${idToken.payload['custom:lastName']} ${idToken.payload['custom:suffix'] || ''}`,
          email: idToken.payload.email,
          phoneNumber: idToken.payload['custom:phone'],
          givenName: idToken.payload['custom:firstName'],
          familyName: idToken.payload['custom:lastName'],
          profile: idToken.payload.profile,
          isGovtEmployee: idToken.payload['custom:isUSGovtEmployee'] === '1',
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
          challengeQuestion: idToken.payload['custom:challengeQuestion']
        }),
      );
    } else {
      store.dispatch(setUser(initialUserState));
    }
  }
  return next(action);
};

export default initMiddleware;
