import api from '../../services/api';

const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNote: builder.query({
      query: (id) => `note/${id}`,
      providesTags: (result, error, id) => [{ type: 'Note', id }],
    }),

    getNoteList: builder.query({
      query: ({ limit, offset }) =>
        `note?limit=${limit}&offset=${offset}`,
      providesTags: ['Note'],
    }),

    createNote: builder.mutation({
      query: (data) => ({
        url: 'note',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Note'],
    }),

    updateNote: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `note/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Note', id },
        'Note',
      ],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `note/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNoteQuery,
  useGetNoteListQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;