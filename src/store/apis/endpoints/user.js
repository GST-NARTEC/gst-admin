import { apiSlice } from "../apiSlice";

const user = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/user/v1/send-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/user/v1/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/v1/create",
        method: "POST",
        body: data,
      }),
    }),

    verifyLicense: builder.mutation({
      query: (data) => ({
        url: "/license/v1/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useCreateUserMutation,
  useVerifyLicenseMutation,
} = user;
