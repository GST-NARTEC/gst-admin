import { apiSlice } from "../apiSlice";

const templatesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all templates by type
    getTemplates: builder.query({
      query: ({ templateType, page = 1, limit = 10 }) =>
        `/v1/template/${templateType}/list?page=${page}&limit=${limit}`,
      providesTags: ["Templates"],
    }),

    // Get single template by pageId
    getTemplate: builder.query({
      query: ({ templateType, pageId }) => ({
        url: `/v1/template/${templateType}`,
        params: { pageId },
      }),
      providesTags: ["TemplatesByPageId"],
    }),
    // get single template by slug
    getTemplateBySlug: builder.query({
      query: ({ templateType, slug }) =>
        `/v1/template/${templateType}/slug?slug=${slug}`,
      providesTags: ["TemplatesBySlug"],
    }),

    // Create template
    createTemplate: builder.mutation({
      query: ({ templateType, data }) => ({
        url: `/v1/template/${templateType}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Templates", "TemplatesBySlug", "TemplatesByPageId"],
    }),

    // Update template
    updateTemplate: builder.mutation({
      query: ({ templateType, id, data }) => ({
        url: `/v1/template/${templateType}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Templates", "TemplatesBySlug", "TemplatesByPageId"],
    }),

    // Delete template
    deleteTemplate: builder.mutation({
      query: ({ templateType, id }) => ({
        url: `/v1/template/${templateType}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates", "TemplatesBySlug", "TemplatesByPageId"],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplateBySlugQuery,
} = templatesApi;
