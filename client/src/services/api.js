import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 const api = createApi({
  reducerPath: 'mainApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500/api',
  }),

  endpoints: () => ({}),
})

export default api