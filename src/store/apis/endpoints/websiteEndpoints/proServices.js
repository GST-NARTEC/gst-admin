import { apiSlice } from "../../apiSlice";

const proServicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProServices: builder.query({
      query: () => "/pro-service/v1",
      providesTags: ["ProServices"],
    }),
    getActiveProServices: builder.query({
      query: () => "/pro-service/v1/active",
      providesTags: ["ProServices"],
    }),
    getProService: builder.query({
      query: (id) => `/pro-service/v1/${id}`,
      providesTags: ["ProServices"],
    }),
    createProService: builder.mutation({
      query: (data) => ({
        url: "/pro-service/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProServices"],
    }),
    updateProService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/pro-service/v1/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProServices"],
    }),
    deleteProService: builder.mutation({
      query: (id) => ({
        url: `/pro-service/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProServices"],
    }),
  }),
});

export const {
  useGetProServicesQuery,
  useGetActiveProServicesQuery,
  useGetProServiceQuery,
  useCreateProServiceMutation,
  useUpdateProServiceMutation,
  useDeleteProServiceMutation,
} = proServicesApi;
