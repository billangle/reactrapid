import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GUID } from '../../../types/types';
import { IMessage } from './types';


interface AppState {
  initialized: boolean;
  pageTitle: string;
  helmetTitle: string;
  sideBarStatus: {
    isCollapsed: boolean;
    isScreenNeedToPushRight: boolean;
  };
  messages: Array<IMessage>;
  reportEmail: string;
}

const initialState: AppState = {
  initialized: false,
  pageTitle: '',
  helmetTitle: '',
  sideBarStatus: {
    isCollapsed: false,
    isScreenNeedToPushRight: true,
  },
  messages: [],
  reportEmail: '',
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appReset: () => {
      return initialState;
    },
    appInitialized: (state) => {
      state.initialized = true;
    },
    setSideNavStatus: (
      state,
      action: PayloadAction<{
        isCollapsed: boolean;
        isScreenNeedToPushRight: boolean;
      }>,
    ) => {
      state.sideBarStatus = {
        ...state.sideBarStatus,
        isCollapsed: action.payload.isCollapsed,
        isScreenNeedToPushRight: action.payload.isScreenNeedToPushRight,
      };
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setReportEmail: (state, action: PayloadAction<string>) => {
      state.reportEmail = action.payload;
    },
    setHelmetTitle: (state, action: PayloadAction<string>) => {
      state.helmetTitle = action.payload;
    },
    setMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages = state.messages.slice().concat(action.payload);
    },
    removeMessage: (state, action: PayloadAction<GUID>) => {
      state.messages = state.messages
        .slice()
        ?.filter((message) => message.id !== action.payload);
    },
  },

});

export const {
  appInitialized,
  setSideNavStatus,
  setPageTitle,
  setReportEmail,
  setHelmetTitle,
  setMessage,
  removeMessage,
  appReset,
} = appSlice.actions;

export default appSlice.reducer;
