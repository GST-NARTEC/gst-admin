import { apiSlice } from "../apiSlice";

const exhibitVisitorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all exhibit visitors with pagination and search
    getExhibitVisitors: builder.query({
      query: (params) => {
        const { 
          page = 1, 
          limit = 10, 
          search = "", 
          name = "", 
          email = "", 
          phone = "", 
          company = "" 
        } = params || {};
        
        const queryParams = new URLSearchParams({
          page,
          limit,
          ...(search && { search }),
          ...(name && { name }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(company && { company }),
        }).toString();
        
        return `/v1/exhibit-visitors?${queryParams}`;
      },
      providesTags: ["ExhibitVisitors"],
    }),

    // Get single exhibit visitor by ID
    getExhibitVisitorById: builder.query({
      query: (id) => `/v1/exhibit-visitors/${id}`,
      providesTags: (result, error, id) => [{ type: "ExhibitVisitors", id }],
    }),

    // Get total count of exhibit visitors
    getExhibitVisitorsCount: builder.query({
      query: () => "/v1/exhibit-visitors/count",
      providesTags: ["ExhibitVisitors"],
    }),

    // Create new exhibit visitor
    createExhibitVisitor: builder.mutation({
      query: (data) => ({
        url: "/v1/exhibit-visitors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ExhibitVisitors"],
    }),

    // Update exhibit visitor (full or partial update)
    updateExhibitVisitor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/exhibit-visitors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "ExhibitVisitors",
        { type: "ExhibitVisitors", id },
      ],
    }),

    // Delete exhibit visitor
    deleteExhibitVisitor: builder.mutation({
      query: (id) => ({
        url: `/v1/exhibit-visitors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExhibitVisitors"],
    }),

    getAllExhibitors: builder.query({
      query: () => "/v1/exhibit-visitors/all",
      providesTags: ["Exhibitors"],
    }),
  }),
});

export const {
  useGetExhibitVisitorsQuery,
  useGetExhibitVisitorByIdQuery,
  useGetExhibitVisitorsCountQuery,
  useCreateExhibitVisitorMutation,
  useUpdateExhibitVisitorMutation,
  useDeleteExhibitVisitorMutation,
  useGetAllExhibitorsQuery,
} = exhibitVisitorApi;
