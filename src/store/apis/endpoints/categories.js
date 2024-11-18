import { apiSlice } from "../apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories with pagination
    getCategories: builder.query({
      query: (params) => ({
        url: "/category/v1",
        method: "GET",
        params,
      }),
      providesTags: ["Categories"],
    }),

    // Create new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: (args) => ({
        url: `/category/v1/${args.id}`,
        method: "PUT",
        body: args.body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
