import {apiSlice} from "../../apiSlice";

export const contactUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (formData) => ({
        url: "/v1/contact-us",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactUsApi;
