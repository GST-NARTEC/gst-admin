import { apiSlice } from "../../apiSlice";

const smartSolutionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSmartSolution: builder.query({
      query: (params) => ({
        url: `/smart-solution/v1`,
        params,
      }),
      providesTags: ["SmartSolution"],
    }),

    getActiveSmartSolutions: builder.query({
      query: () => ({
        url: `/smart-solution/v1/active`,
      }),
      providesTags: ["SmartSolution"],
    }),

    createSmartSolution: builder.mutation({
      query: (data) => ({
        url: `/smart-solution/v1`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SmartSolution"],
    }),

    updateSmartSolution: builder.mutation({
      query: (args) => ({
        url: `/smart-solution/v1/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["SmartSolution"],
    }),

    deleteSmartSolution: builder.mutation({
      query: (id) => ({
        url: `/smart-solution/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SmartSolution"],
    }),
  }),
});
export const {
  useGetSmartSolutionQuery,
  useCreateSmartSolutionMutation,
  useUpdateSmartSolutionMutation,
  useDeleteSmartSolutionMutation,
  useGetActiveSmartSolutionsQuery,
} = smartSolutionApi;
