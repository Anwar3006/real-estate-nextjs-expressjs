import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      try {
        headers.set("Content-Type", "application/json");
        // Token will be handled per endpoint now
      } catch (error) {
        console.error("Authentication error:", error);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Managers", "Tenants"],
  endpoints: (build) => ({
    // Get authenticated user
    getAuthUser: build.query<
      ApiResponse<User>,
      {
        user: {
          id: string;
          email: string;
          fullName: string;
          phoneNumber: string;
          image_url: string;
        };
        role: string;
        token: string;
      }
    >({
      queryFn: async (
        { user, role, token },
        _api,
        _extraOptions,
        fetchWithbaseQuery
      ) => {
        const endpoint =
          role === "tenant" ? `/tenants/${user.id}` : `/managers/${user.id}`;

        const result = await fetchWithbaseQuery({
          url: endpoint,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (result.error) {
          if (result.meta?.response?.status === 404) {
            const userDetailsResponse = await createNewUserInDatabase(
              user,
              role,
              token,
              fetchWithbaseQuery
            );

            if (userDetailsResponse.data) {
              return { data: userDetailsResponse.data as ApiResponse<User> };
            }
          }

          return { error: result.error };
        }

        return { data: result.data as ApiResponse<User> };
      },
    }),

    updateTenant: build.mutation<
      Tenant,
      { clerkId: string; token: string } & Partial<Tenant>
    >({
      query: ({ clerkId, token, ...updatedTenant }) => ({
        url: `tenants/${clerkId}`,
        method: "PATCH",
        body: updatedTenant,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (results) => [{ type: "Tenants", id: results?.id }],
    }),

    updateManager: build.mutation<
      Manager,
      { clerkId: string; token: string } & Partial<Manager>
    >({
      query: ({ clerkId, token, ...updatedManager }) => ({
        url: `managers/${clerkId}`,
        method: "PATCH",
        body: updatedManager,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (results) => [{ type: "Managers", id: results?.id }],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useUpdateTenantMutation,
  useUpdateManagerMutation,
} = api;
