import { apiSlice } from "../../apiSlice";

const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => "/slider/v1",
      providesTags: ["Sliders"],
    }),
    getActiveSliders: builder.query({
      query: () => "/slider/v1/active",
      providesTags: ["Sliders"],
    }),
    getSlider: builder.query({
      query: (id) => `/slider/v1/${id}`,
      providesTags: ["Sliders"],
    }),
    createSlider: builder.mutation({
      query: (body) => ({
        url: "/slider/v1",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sliders"],
    }),
    updateSlider: builder.mutation({
      query: (args) => ({
        url: `/slider/v1/${args.id}`,
        method: "PUT",
        body: args.body,
      }),
      invalidatesTags: ["Sliders"],
    }),
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/slider/v1/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sliders"],
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
