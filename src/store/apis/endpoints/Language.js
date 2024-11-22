import { apiSlice } from '../apiSlice'

const LanguageApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Get all Language with pagination
    getLanguage: builder.query({
      query: params => ({
        url: '/masterdata/v1/translations_table',
        method: 'GET',
        params
      }),
      providesTags: ['Language']
    }),

    // Create new Language
    createLanguage: builder.mutation({
      query: data => ({
        url: '/masterdata/v1/translations_post',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Language']
    }),

    // Update Language
    updateLanguage: builder.mutation({
      query: args => ({
        url: `/masterdata/v1/translations_put/${args.id}`,
        method: 'PUT',
        body: args.body
      }),
      invalidatesTags: ['Language']
    }),

    // Delete Language
    // deleteLanguage: builder.mutation({
    //   query: id => ({
    //     url: `/masterdata/v1/translations`,
    //     method: 'Delete'
    //   }),
    //   invalidatesTags: ['Language']
    // }),
    getLanguageChange: builder.query({
      query: params => ({
        url: '/masterdata/v1/translations',
        method: 'GET',
      }),
      providesTags: ['Language']
    }),
  })
})

export const {
  useGetLanguageQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  // useDeleteLanguageMutation,
  useGetLanguageChangeQuery
} = LanguageApi
