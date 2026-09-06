import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      // Make sure it's "Bearer <token>" format
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const api = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQuery,
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});

export default api;