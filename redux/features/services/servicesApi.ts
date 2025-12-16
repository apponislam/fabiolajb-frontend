import { baseApi } from "@/redux/api/baseApi";

const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: Create service with image
        createService: builder.mutation({
            query: (formData) => ({
                url: "/service",
                method: "POST",
                body: formData,
                formData: true,
            }),
        }),

        // GET: All services
        getAllServices: builder.query({
            query: () => "/service",
        }),

        // GET: Active services
        getActiveServices: builder.query({
            query: () => "/service/active",
        }),

        // PATCH: Update service
        updateService: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/service/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        // DELETE: Service
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery, useGetActiveServicesQuery, useUpdateServiceMutation, useDeleteServiceMutation } = servicesApi;
