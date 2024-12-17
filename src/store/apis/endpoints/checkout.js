import { apiSlice } from "../apiSlice";

const checkout = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (checkoutData) => ({
        url: "/checkout/v1/process",
        method: "POST",
        body: checkoutData,
      }),
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/user/v1/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["userDetails"],
    }),
  }),
});

export const { useCheckoutMutation, useCreateOrderMutation } = checkout;
