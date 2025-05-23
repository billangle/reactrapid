import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from './authTypes';
import { doLogin } from './authActions';
import { Auth } from 'aws-amplify';
import { clearLoggedInInfoInLocalStorage } from '../../../utils/auth';
import { MODULE } from '../../../types/enums';

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: AuthUser | null;
}

export const initialUserState: AuthUser = {
  isLoggedIn: false,
  accessToken: '',
  idToken: '',
  username: '',
  name: '',
  profile: '',
  email: '',
  phoneNumber: '',
  givenName: '',
  familyName: '',
  //roles: [],
  isGovtEmployee: false,
  isSuperUser: false,
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  apt: '',
  confirmEmail: '',
  middlename: '',
  prefix: '',
  suffix: '',
  challengeAnswer: '',
  challengeQuestion: '',

};

const initialState: AuthState = {
  loading: true,
  error: '',
  user: initialUserState,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    signout: (state) => {
      Auth.signOut();
      clearLoggedInInfoInLocalStorage();
      state.user = null;
    },
    authReset: () => {
      return initialState;
    },
    // Other reducers
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(doLogin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch user data.';
    });
  },
});

export const { setUser, signout, authReset } = authSlice.actions;

export default authSlice.reducer;
