import { apiSlice } from "../../apiSlice";

// Menu Items API
const menuItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => "/menu/v1",
      providesTags: ["MenuItems"],
    }),
    getActiveMenuItems: builder.query({
      query: () => "/menu/v1/active",
      providesTags: ["MenuItems"],
    }),
    getMenuItem: builder.query({
      query: (id) => `/menu/v1/${id}`,
      providesTags: ["MenuItems"],
    }),
    createMenuItem: builder.mutation({
      query: (body) => ({
        url: "/menu/v1",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/menu/v1/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
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
