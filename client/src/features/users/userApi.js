import api from '../../services/api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getuser: builder.query({
      query: (id) => `user/${id}`,
    }),

    getUserDropdown: builder.query({
      query: () => `user/dropdown`,
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserDropdownQuery,
} = userApi;