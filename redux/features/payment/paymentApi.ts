import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutSession: builder.query({
            query: (quoteId) => `/payment/checkout-session/${quoteId}`,
        }),
        getPaymentById: builder.query({
            query: (id) => `/payment/${id}`,
        }),
        getAllPayments: builder.query({
            query: (params?: { page?: number; limit?: number; searchTerm?: string }) => {
                const queryParams: any = {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                };

                if (params?.searchTerm) {
                    queryParams.searchTerm = params.searchTerm;
                }

                return {
                    url: "/payment",
                    method: "GET",
                    params: queryParams,
                };
            },
        }),
    }),
});

export const { useCreateCheckoutSessionQuery, useGetPaymentByIdQuery, useGetAllPaymentsQuery } = paymentApi;
