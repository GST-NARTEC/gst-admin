import { apiSlice } from "../apiSlice";

const barcodeTypes = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBarcodeTypes: builder.query({
      query: () => ({
        url: "/v1/barcode-types",
        method: "GET",
      }),
      providesTags: ["barcodeTypes"],
    }),

    getBarcodeTypeById: builder.query({
      query: (id) => ({
        url: `/v1/barcode-types/${id}`,
        method: "GET",
      }),
      providesTags: ["barcodeType"],
    }),

    createBarcodeType: builder.mutation({
      query: (data) => ({
        url: "/v1/barcode-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["barcodeTypes"],
    }),

    updateBarcodeType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/barcode-types/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["barcodeType", "barcodeTypes"],
    }),

    deleteBarcodeType: builder.mutation({
      query: (id) => ({
        url: `/v1/barcode-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["barcodeTypes"],
    }),
  }),
});

export const {
  useGetBarcodeTypesQuery,
  useGetBarcodeTypeByIdQuery,
  useCreateBarcodeTypeMutation,
  useUpdateBarcodeTypeMutation,
  useDeleteBarcodeTypeMutation,
} = barcodeTypes;
