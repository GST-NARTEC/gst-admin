import { apiSlice } from "../apiSlice";

const products = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/v1",
        method: "POST",
        body: data,
      }),
    }),

    getProducts: builder.query({
      query: (params) => ({
        url: "/products/v1",
        method: "GET",
        params, // For pagination
      }),
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/products/v1/${id}`,
        method: "GET",
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/v1/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/v1/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = products;
