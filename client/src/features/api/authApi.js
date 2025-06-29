import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API_URL = "http://localhost:8000/api/v1/user/";

// Create an API slice
export const authApi = createApi({
    reducerPath: 'authApi', // used to generate the slice name
    baseQuery: fetchBaseQuery({ baseUrl: USER_API_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (inputData) => ({
                url: 'register',
                method: 'POST',
                body: inputData
            }),
        }),
        login: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: 'POST',
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                   
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: 'profile',
                method: 'GET',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }), 
        
        updateUser: builder.mutation({
            query: (formData) => ({
                url: 'profile/update',
                method: 'PUT',
                body: formData,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useLogoutMutation,
} = authApi;

