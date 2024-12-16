import { apiSlice } from "../apiSlice";
import { setCredentials, setAdmin } from "../../slice/adminSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/v1/superadmin/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: responseData } = await queryFulfilled;
          const { superAdmin } = responseData.data;

          // Set credentials (tokens)
          dispatch(
            setCredentials({
              accessToken: superAdmin.accessToken,
              refreshToken: superAdmin.refreshToken,
            })
          );

          // Set admin data
          dispatch(
            setAdmin({
              id: superAdmin.id,
              email: superAdmin.email,
              createdAt: superAdmin.createdAt,
              updatedAt: superAdmin.updatedAt,
            })
          );
        } catch (err) {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const { useLoginMutation } = adminApiSlice;
