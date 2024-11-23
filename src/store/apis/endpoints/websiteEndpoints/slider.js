import { apiSlice } from "../../apiSlice";

const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => "/slider/v1",
    }),
    getActiveSliders: builder.query({
      query: () => "/slider/v1/active",
    }),
    getSlider: builder.query({
      query: (id) => `/slider/v1/${id}`,
    }),
    createSlider: builder.mutation({
      query: (body) => ({
        url: "/slider/v1",
        method: "POST",
        body,
      }),
    }),
    updateSlider: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/slider/v1/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/slider/v1/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSlidersQuery,
  useGetActiveSlidersQuery,
  useGetSliderQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi;
