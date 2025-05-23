import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserDetailsState {
  loading: boolean;
  error: string | null;
  passedEinWithPin: string;
  userDetails: any;
}

const initialState: UserDetailsState = {
  loading: false,
  error: '',
  passedEinWithPin: '',
  userDetails: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userReset: () => {
      return initialState;
    },
    setPassedEinWithPin: (state, action: PayloadAction<string>) => {
      state.passedEinWithPin = action.payload;
    },
  },
});

export const { setPassedEinWithPin, userReset } = usersSlice.actions;

export default usersSlice.reducer;
