import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, AuthResponse} from "../../../types/types";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api/auth', credentials: 'include'}),
    endpoints: builder => ({
        
        register: builder.mutation<AuthResponse, { fullName: string; email: string; password: string }>(
            { query: (body) => ({ url: '/signup', method: 'POST', body }), }
        ),
        login: builder.mutation<AuthResponse, { email: string; password: string }>(
            { query: (body) => ({ url: '/login', method: 'POST', body }), }
        ),
        logout: builder.mutation<void, void>({
            query: () => ({ url: '/logout', method: 'POST' }),
        }),
        setupProfile: builder.mutation<User, { profilePic: string | null }>({
            query: (body) => ({ url: '/setup-profile', method:'PUT', body }),
        }),
        getMe: builder.query<User, void>({
            query: () => ({
                url: '/me',
                method: 'GET'
            })
        })
    })
})

export const { 
        useRegisterMutation,
        useLoginMutation,
        useLogoutMutation,
        useSetupProfileMutation,
        useGetMeQuery
 } = authApi