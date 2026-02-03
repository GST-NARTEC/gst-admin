import { apiSlice } from "../apiSlice";

const kpi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get KPI Overview Statistics
    getKpiOverview: builder.query({
      query: (params) => ({
        url: "/v1/kpi/overview",
        method: "GET",
        params,
      }),
      providesTags: ["kpiOverview"],
    }),

    // Get Revenue Trends for Charts
    getRevenueTrends: builder.query({
      query: (params) => ({
        url: "/v1/kpi/revenue-trends",
        method: "GET",
        params,
      }),
      providesTags: ["kpiTrends"],
    }),

    // Get Members List with Order Statistics
    getKpiMembers: builder.query({
      query: (params) => ({
        url: "/v1/kpi/members",
        method: "GET",
        params,
      }),
      providesTags: ["kpiMembers"],
    }),

    // Get Quick Stats for Dashboard Cards
    getQuickStats: builder.query({
      query: (params) => ({
        url: "/v1/kpi/quick-stats",
        method: "GET",
        params,
      }),
      providesTags: ["kpiQuickStats"],
    }),

    // Get Top Products
    getTopProducts: builder.query({
      query: (params) => ({
        url: "/v1/kpi/top-products",
        method: "GET",
        params,
      }),
      providesTags: ["kpiTopProducts"],
    }),

    // Export KPI Data
    getKpiExport: builder.query({
      query: (params) => ({
        url: "/v1/kpi/export",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetKpiOverviewQuery,
  useGetRevenueTrendsQuery,
  useGetKpiMembersQuery,
  useGetQuickStatsQuery,
  useGetTopProductsQuery,
  useGetKpiExportQuery,
  useLazyGetKpiExportQuery,
  useLazyGetKpiMembersQuery,
} = kpi;
