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
            query: () => "/payment",
        }),
    }),
});

export const { useCreateCheckoutSessionQuery, useGetPaymentByIdQuery, useGetAllPaymentsQuery } = paymentApi;
