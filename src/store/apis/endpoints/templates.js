import { apiSlice } from "../apiSlice";

const templatesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all templates by type
    getTemplates: builder.query({
      query: ({ templateType, page = 1, limit = 10 }) =>
        `/templates/${templateType}/list?page=${page}&limit=${limit}`,
      providesTags: ["Templates"],
    }),

    // Get single template
    getTemplate: builder.query({
      query: ({ templateType, pageId }) => ({
        url: `/templates/${templateType}`,
        params: { pageId }
      }),
    }),

    // Create template
    createTemplate: builder.mutation({
      query: ({ templateType, data }) => ({
        url: `/templates/${templateType}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),

    // Update template
    updateTemplate: builder.mutation({
      query: ({ templateType, id, data }) => ({
        url: `/templates/${templateType}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),

    // Delete template
    deleteTemplate: builder.mutation({
      query: ({ templateType, id }) => ({
        url: `/templates/${templateType}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates"],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templatesApi;
