import { apiSlice } from "../apiSlice";

export const localizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocalization: builder.query({
      query: () => "/v1/localizations/all",
      keepUnusedDataFor: 1000 * 60 * 60, //for 1hour
      providesTags: ["Localization"],
    }),
    getPaginatedLocalizations: builder.query({
      query: (params) => ({
        url: "/v1/localizations",
        params,
      }),
      providesTags: ["Localization"],
    }),

    updateLocalization: builder.mutation({
      query: (args) => ({
        url: `/v1/localizations`,
        method: "PUT",
        body: args.body,
      }),
      invalidatesTags: ["Localization"],
    }),
  }),
});

export const {
  useGetLocalizationQuery,
  useGetPaginatedLocalizationsQuery,
  useUpdateLocalizationMutation,
} = localizationApiSlice;
