import { apiSlice } from "../apiSlice";

const brands = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (memberId) => ({
        url: `/v1/brands/getUserBrands/${memberId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBrandsQuery } = brands;
