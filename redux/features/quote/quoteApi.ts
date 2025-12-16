import { baseApi } from "@/redux/api/baseApi";

const quoteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST: Create quote
        createQuote: builder.mutation({
            query: (quoteData) => ({
                url: "/quote",
                method: "POST",
                body: quoteData,
            }),
        }),

        // GET: All quotes with pagination
        getAllQuotes: builder.query({
            query: (params?: { page?: number; limit?: number }) => ({
                url: "/quote",
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            }),
        }),

        // GET: Single quote
        getQuoteById: builder.query({
            query: (id) => `/quote/${id}`,
        }),

        // PATCH: Update quote
        updateQuote: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/quote/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        // DELETE: Quote
        deleteQuote: builder.mutation({
            query: (id) => ({
                url: `/quote/${id}`,
                method: "DELETE",
            }),
        }),

        // POST: Send payment link
        sendPaymentLink: builder.mutation({
            query: (id) => ({
                url: `/quote/send-payment-link/${id}`,
                method: "POST",
            }),
        }),
    }),
});

export const { useCreateQuoteMutation, useGetAllQuotesQuery, useGetQuoteByIdQuery, useUpdateQuoteMutation, useDeleteQuoteMutation, useSendPaymentLinkMutation } = quoteApi;
