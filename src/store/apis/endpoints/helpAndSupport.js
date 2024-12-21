import { apiSlice } from "../apiSlice";

export const Status = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
};

export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

export const TicketCategory = {
  ACCOUNT: "ACCOUNT",
  ORDER: "ORDER",
  PRODUCT: "PRODUCT",
  PAYMENT: "PAYMENT",
  OTHER: "OTHER",
};

const helpAndSupportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHelpAndSupport: builder.query({
      query: (params) => {
        const { page = 1, limit = 10, search = "", status = "", priority = "", category = "" } = params || {};
        const queryParams = new URLSearchParams({
          page,
          limit,
          ...(search && { search }),
          ...(status && { status: status.toUpperCase() }),
          ...(priority && { priority: priority.toUpperCase() }),
          ...(category && { category: category.toUpperCase() }),
        }).toString();
        return `/v1/help-tickets/admin?${queryParams}`;
      },
      providesTags: ["HelpTickets"],
    }),

    updateHelpAndSupport: builder.mutation({
      query: (args) => ({
        url: `/v1/help-tickets/${args.id}`,
        method: "PATCH",
        body: {
          ...args.data,
          status: args.data.status?.toUpperCase(),
          priority: args.data.priority?.toUpperCase(),
          category: args.data.category?.toUpperCase(),
        },
      }),
      invalidatesTags: ["HelpTickets"],
    }),

    deleteHelpAndSupport: builder.mutation({
      query: (id) => ({
        url: `/v1/help-tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HelpTickets"],
    }),
  }),
});

export const {
  useGetHelpAndSupportQuery,
  useUpdateHelpAndSupportMutation,
  useDeleteHelpAndSupportMutation,
} = helpAndSupportApi;
