import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../slice/adminSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.gstsa1.org/api",
  // baseUrl: "http://localhost:1000/api",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().admin.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 419) {
    // Try to get a new token
    const refreshToken = api.getState().admin.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: "/v1/superadmin/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store both new tokens
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.data.accessToken,
          refreshToken: refreshResult.data.data.refreshToken,
        })
      );

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, logout the user
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
