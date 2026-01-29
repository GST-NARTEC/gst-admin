import { apiSlice } from "../apiSlice";

export const filesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all files with pagination, search, and filtering
    getFiles: builder.query({
      query: (params) => ({
        url: "/v1/files",
        method: "GET",
        params,
      }),
      providesTags: ["Files"],
    }),

    // Get a single file by ID
    getFileById: builder.query({
      query: (id) => `/v1/files/${id}`,
      providesTags: (result, error, id) => [{ type: "Files", id }],
    }),

    // Upload new file
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/v1/files",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Files"],
    }),

    // Update file (name/replace file)
    updateFile: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/v1/files/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Files"],
    }),

    // Toggle active status
    toggleFileStatus: builder.mutation({
      query: (id) => ({
        url: `/v1/files/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Files"],
    }),

    // Delete file
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/v1/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileByIdQuery,
  useUploadFileMutation,
  useUpdateFileMutation,
  useToggleFileStatusMutation,
  useDeleteFileMutation,
} = filesApiSlice;
