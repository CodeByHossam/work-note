import {api} from '../../api/api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getuser: builder.query({
      query: (name) => `user/${name}`,
    }),

    getuserList: builder.query({
      query: ({ limit, offset }) =>
        `user?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserListQuery,
} = userApi;