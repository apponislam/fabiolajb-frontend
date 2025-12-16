import { baseApi } from "@/redux/api/baseApi";

const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: Create service with image
        createService: builder.mutation({
            query: (formData: FormData) => ({
                url: "/service",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Service"],
        }),

        getAllServices: builder.query({
            query: (params?: { page?: number; limit?: number; searchTerm?: string }) => {
                const queryParams: any = {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                };

                if (params?.searchTerm) {
                    queryParams.searchTerm = params.searchTerm;
                }

                return {
                    url: "/service",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["Service"],
        }),

        getActiveServices: builder.query({
            query: () => "/service/active",
        }),

        updateService: builder.mutation({
            query: ({ id, body }) => {
                // Send FormData as-is (with data field containing JSON string)
                return {
                    url: `/service/${id}`,
                    method: "PATCH",
                    body,
                    // No headers - browser sets multipart/form-data with boundary
                };
            },
            invalidatesTags: ["Service"],
        }),

        // DELETE: Service
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Service"],
        }),
    }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery, useGetActiveServicesQuery, useUpdateServiceMutation, useDeleteServiceMutation } = servicesApi;
