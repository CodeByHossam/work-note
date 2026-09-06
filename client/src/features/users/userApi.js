import api from '../../services/api';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getuser: builder.query({
      query: (id) => `user/${id}`,
    }),

    getAllUsers: builder.query({
      query: () => `user`,
      providesTags: ['User'],
    }),

    getUserDropdown: builder.query({
      query: () => `user/dropdown`,
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useGetUserDropdownQuery,
} = userApi;