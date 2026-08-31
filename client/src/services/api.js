import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'mainApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https:localhost:5000/shop-notes',
  }),

  endpoints: () => ({}),
})