import { apiSlice } from "../../apiSlice";

const coreSolutionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoreSolutions: builder.query({
      query: () => "/core-solution/v1",
      providesTags: ["CoreSolution"],
    }),
    getCoreSolution: builder.query({
      query: (id) => `/core-solution/v1/${id}`,
      providesTags: ["CoreSolution"],
    }),
    getActiveCoreSolutions: builder.query({
      query: () => "/core-solution/v1/active",
      providesTags: ["CoreSolution"],
    }),
    createCoreSolution: builder.mutation({
      query: (data) => ({
        url: "/core-solution/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CoreSolution"],
    }),
    updateCoreSolution: builder.mutation({
      query: ({ id, data }) => ({
        url: `/core-solution/v1/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CoreSolution"],
    }),
    deleteCoreSolution: builder.mutation({
      query: (id) => ({
        url: `/core-solution/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CoreSolution"],
    }),
  }),
});

export const {
  useGetCoreSolutionsQuery,
  useGetCoreSolutionQuery,
  useGetActiveCoreSolutionsQuery,
  useCreateCoreSolutionMutation,
  useUpdateCoreSolutionMutation,
  useDeleteCoreSolutionMutation,
} = coreSolutionApi;
