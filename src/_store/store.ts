import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import initMiddleware from "./middleware/initMiddleware";
import { reportApi } from "../modules/reports/store/middlewares/reportModuleApi";
import { employmentHistoryApi } from "../modules/employment-history/store/middleware/employmentHistoryModuleApi";
import { sharedApi } from "./middleware/sharedApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }).concat(
      reportApi.middleware,
      employmentHistoryApi.middleware,
      sharedApi.middleware,
      initMiddleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
