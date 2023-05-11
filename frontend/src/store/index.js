import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import projectSlice from "./slices/projectSlice";
import projectsSlice from "./slices/projectsSlice";
import portfolioReducer from "./slices/portfolioSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    portfolio: portfolioReducer,
    profile: profileReducer,
    projects: projectsSlice,
    project: projectSlice
  },
});
