import { apiSlice } from "../../apiSlice";

const subMenuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubMenus: builder.query({
      query: () => "/submenu/v1",
      providesTags: ["SubMenus"],
    }),
    getActiveSubMenus: builder.query({
      query: () => "/submenu/v1/active",
      providesTags: ["SubMenus"],
    }),
    getSubMenu: builder.query({
      query: (id) => `/submenu/v1/${id}`,
      providesTags: ["SubMenus"],
    }),
    createSubMenu: builder.mutation({
      query: (body) => ({
        url: "/submenu/v1",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SubMenus", "MenuItems"], // Invalidate both since submenus affect menu display
    }),
    updateSubMenu: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/submenu/v1/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SubMenus", "MenuItems"],
    }),
    deleteSubMenu: builder.mutation({
      query: (id) => ({
        url: `/submenu/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubMenus", "MenuItems"],
    }),
  }),
});

export const {
  useGetSubMenusQuery,
  useGetActiveSubMenusQuery,
  useGetSubMenuQuery,
  useCreateSubMenuMutation,
  useUpdateSubMenuMutation,
  useDeleteSubMenuMutation,
} = subMenuApi;
