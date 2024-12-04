import { apiSlice } from "../apiSlice";

const addonsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddon: builder.mutation({
      query: (newAddon) => ({
        url: "/v1/addons",
        method: "POST",
        body: newAddon,
      }),
      invalidatesTags: ["Addons"],
    }),
    getAddons: builder.query({
      query: (params) => ({
        url: "/v1/addons",
        params,
      }),
      providesTags: ["Addons"],
    }),
    getActiveAddons: builder.query({
      query: () => "/v1/addons/active",
      providesTags: ["Addons"],
    }),
    updateAddon: builder.mutation({
      query: ({ id, ...updatedAddon }) => ({
        url: `/v1/addons/${id}`,
        method: "PATCH",
        body: updatedAddon,
      }),
      invalidatesTags: ["Addons"],
    }),
    deleteAddon: builder.mutation({
      query: (id) => ({
        url: `/v1/addons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addons"],
    }),
  }),
});

export const {
  useCreateAddonMutation,
  useGetAddonsQuery,
  useGetActiveAddonsQuery,
  useUpdateAddonMutation,
  useDeleteAddonMutation,
} = addonsApi;
