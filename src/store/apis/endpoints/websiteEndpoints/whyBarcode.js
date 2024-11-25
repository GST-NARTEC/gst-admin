import { apiSlice } from "../../apiSlice";

const whyBarcodeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWhyBarcodes: builder.query({
      query: () => "/v1/whybarcode",
      providesTags: ["WhyBarcode"],
    }),
    getWhyBarcode: builder.query({
      query: (id) => `/v1/whybarcode/${id}`,
      providesTags: ["WhyBarcode"],
    }),
    getActiveWhyBarcodes: builder.query({
      query: () => "/v1/whybarcode/active",
      providesTags: ["WhyBarcode"],
    }),
    createWhyBarcode: builder.mutation({
      query: (data) => ({
        url: "/v1/whybarcode",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WhyBarcode"],
    }),
    updateWhyBarcode: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/whybarcode/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["WhyBarcode"],
    }),
    deleteWhyBarcode: builder.mutation({
      query: (id) => ({
        url: `/v1/whybarcode/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WhyBarcode"],
    }),
  }),
});

export const {
  useGetWhyBarcodesQuery,
  useGetWhyBarcodeQuery,
  useGetActiveWhyBarcodesQuery,
  useCreateWhyBarcodeMutation,
  useUpdateWhyBarcodeMutation,
  useDeleteWhyBarcodeMutation,
} = whyBarcodeApi;
