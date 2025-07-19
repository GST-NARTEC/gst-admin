import { apiSlice } from "../apiSlice";

const companiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => ({
                url: "/company/v1",
                method: "GET",
            }),
            providesTags: ["Companies"],
        }),
        createCompany: builder.mutation({
            query: (data) => ({
                url: "/company/v1",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Companies"],
        }),
        updateCompany: builder.mutation({
            query: ({ id, data }) => ({
                url: `/company/v1/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Companies"],
        }),
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `/company/v1/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Companies"],
        }),
    }),
    });

export const {
    useGetCompaniesQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
} = companiesApiSlice;