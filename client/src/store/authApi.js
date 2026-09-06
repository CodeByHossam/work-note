// auth api call
import api from "../services/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
export const { useLoginMutation } = authApi;
