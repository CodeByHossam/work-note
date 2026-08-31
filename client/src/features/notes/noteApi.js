import {api} from '../../services/api';

const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNote: builder.query({
      query: (name) => `note/${name}`,
    }),

    getNoteList: builder.query({
      query: ({ limit, offset }) =>
        `note?limit=${limit}&offset=${offset}`,
    }),
  }),
});

export const {
  useGetNoteQuery,
  useGetNoteListQuery,
} = noteApi;