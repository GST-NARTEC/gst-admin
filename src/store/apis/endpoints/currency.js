import { apiSlice } from "../apiSlice";
import { setCurrencySymbol } from "../../slice/currencySlice";

const currencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: () => "/currency/v1",
      providesTags: ["Currency"],
      transformResponse: (response) => response?.data?.currencies[0],
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrencySymbol(data.symbol));
        } catch (err) {
          console.error("Failed to set currency symbol:", err);
        }
      },
    }),

    createCurrency: builder.mutation({
      query: (data) => ({
        url: "/currency/v1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Currency"],
    }),

    updateCurrency: builder.mutation({
      query: (data) => ({
        url: `/currency/v1/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Currency"],
    }),
  }),
});

export const {
  useGetCurrencyQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
} = currencyApi;
