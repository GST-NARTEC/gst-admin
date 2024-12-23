import { apiSlice } from "../apiSlice";

export const barcodeMasterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBulkGtins: builder.mutation({
      query: (data) => ({
        url: "/v1/gtins/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gtins", "GtinsStats"],
    }),
    getGtins: builder.query({
      query: (params) => ({
        url: "/v1/gtins",
        method: "GET",
        params,
      }),
      providesTags: ["Gtins"],
    }),
    getGtinStats: builder.query({
      query: () => "/v1/gtins/stats",
      providesTags: ["GtinsStats"],
    }),
  }),
});

export const {
  useAddBulkGtinsMutation,
  useGetGtinsQuery,
  useGetGtinStatsQuery,
} = barcodeMasterApiSlice;
