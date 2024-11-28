import { apiSlice } from "../apiSlice";

const pageSetupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPage: builder.mutation({
      query: (data) => ({
        url: "/page/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),

    getPages: builder.query({
      query: () => "/page/v1",
      providesTags: ["Pages"],
    }),

    getPagesByTemplate: builder.query({
      query: ({ template }) => `/page/v1/template/${template}`,
      providesTags: ["Pages"],
    }),

    getPageById: builder.query({
      query: (id) => `/page/v1/${id}`,
      providesTags: ["Pages"],
    }),

    updatePage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/page/v1/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pages"],
    }),

    deletePage: builder.mutation({
      query: (id) => ({
        url: `/page/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pages"],
    }),
  }),
});

export const {
  useCreatePageMutation,
  useGetPagesQuery,
  useGetPagesByTemplateQuery,
  useGetPageByIdQuery,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pageSetupApi;
