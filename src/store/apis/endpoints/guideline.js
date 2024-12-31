import { apiSlice } from "../apiSlice";

export const guidelineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all user guides with pagination, search, and filtering
    getUserGuides: builder.query({
      query: (params) => ({
        url: "/v1/user-guides",
        method: "GET",
        params,
      }),
      providesTags: ["UserGuides"],
    }),

    // Get a single user guide by ID
    getUserGuideById: builder.query({
      query: (id) => `/v1/user-guides/${id}`,
    }),

    // Create a new user guide
    createUserGuide: builder.mutation({
      query: (data) => ({
        url: "/v1/user-guides",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserGuides"],
    }),

    // Update a user guide
    updateUserGuide: builder.mutation({
      query: (args) => ({
        url: `/v1/user-guides/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["UserGuides"],
    }),

    // Delete a user guide
    deleteUserGuide: builder.mutation({
      query: (id) => ({
        url: `/v1/user-guides/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserGuides"],
    }),

    // Upload large video for user guide
    uploadLargeVideo: builder.mutation({
      query: (data) => ({
        url: "/v1/user-guides/upload-large",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserGuides"],
    }),
  }),
});

export const {
  useGetUserGuidesQuery,
  useGetUserGuideByIdQuery,
  useCreateUserGuideMutation,
  useUpdateUserGuideMutation,
  useDeleteUserGuideMutation,
  useUploadLargeVideoMutation,
} = guidelineApiSlice;
