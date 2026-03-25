import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../types/types'
import type { RootState } from '../store'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/user',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({

    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),

  }),
})

export const { useGetUsersQuery } = userApi