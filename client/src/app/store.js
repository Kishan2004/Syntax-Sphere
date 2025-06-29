import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";  // Ensure correct import
import { authApi } from "../features/api/authApi";
import { courseApi } from "@/features/api/courseApi"; // Ensure correct import

export const appStore = configureStore({
    reducer: {
        auth: authReducer, //  Correctly use 'auth' to match Redux state
        [authApi.reducerPath]: authApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer, // Added courseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware),
});

const initializeApp=async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}));
   
}
initializeApp();