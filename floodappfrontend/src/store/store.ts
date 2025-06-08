import { configureStore } from '@reduxjs/toolkit';
import userRoleReducer from './userRoleSlice';
import officialIdReducer from './UserOfficalID';
const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    officialId: officialIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
