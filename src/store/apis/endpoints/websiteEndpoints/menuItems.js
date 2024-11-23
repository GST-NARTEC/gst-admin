import { apiSlice } from "../../apiSlice";

// Menu Items API
const menuItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => "/menu/v1",
    }),
    getActiveMenuItems: builder.query({
      query: () => "/menu/v1/active",
    }),
    getMenuItem: builder.query({
      query: (id) => `/menu/v1/${id}`,
    }),
    createMenuItem: builder.mutation({
      query: (body) => ({
        url: "/menu/v1",
        method: "POST",
        body,
      }),
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/menu/v1/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu/v1/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetActiveMenuItemsQuery,
  useGetMenuItemQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemsApi;
