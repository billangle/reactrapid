import { combineReducers } from "@reduxjs/toolkit";
// Global Reducers
import authReducer from "./features/auth/authSlice";
import appReducer from "../_store/features/app/appSlice";
import usersReducer from "./features/users/usersSlice";
import { reportApi } from "../modules/reports/store/middlewares/reportModuleApi";
import { employmentHistoryApi } from "../modules/employment-history/store/middleware/employmentHistoryModuleApi";
import { sharedApi } from "./middleware/sharedApi";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [employmentHistoryApi.reducerPath]: employmentHistoryApi.reducer,
  [sharedApi.reducerPath]: sharedApi.reducer,
});

export default rootReducer;

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;
