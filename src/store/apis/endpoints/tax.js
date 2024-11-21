import { apiSlice } from "../apiSlice";

const taxApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTax: builder.query({
      query: () => ({
        url: "/vat/v1",
        method: "GET",
      }),
      providesTags: ["Tax"],
    }),
    createTax: builder.mutation({
      query: (data) => ({
        url: "/vat/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tax"],
    }),

    updateTax: builder.mutation({
      query: (data) => ({
        url: `/vat/v1/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Tax"],
    }),

    deleteTax: builder.mutation({
      query: (id) => ({
        url: `/vat/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tax"],
    }),
  }),
});

export const {
  useGetTaxQuery,
  useCreateTaxMutation,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = taxApi;
