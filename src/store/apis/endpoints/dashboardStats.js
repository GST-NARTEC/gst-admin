import { apiSlice } from "../apiSlice";

export const dashboardStatsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersCount: builder.query({
      query: () => "/v1/orders/orders-count",
    }),
    getUsersCount: builder.query({
      query: () => "/user/v1/users-count",
    }),
    getProductsCount: builder.query({
      query: () => "/products/v1/count",
    }),
    getCategoriesCount: builder.query({
      query: () => "/category/v1/count",
    }),
    getTopSoldProducts: builder.query({
      query: () => "/v1/orders/top-sold-products",
    }),
  }),
});

export const {
  useGetOrdersCountQuery,
  useGetUsersCountQuery,
  useGetProductsCountQuery,
  useGetCategoriesCountQuery,
  useGetTopSoldProductsQuery,
} = dashboardStatsApi;
