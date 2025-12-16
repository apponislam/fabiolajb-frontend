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
            invalidatesTags: ["Quote"],
        }),

        // GET: All quotes with pagination
        getAllQuotes: builder.query({
            query: (params?: { page?: number; limit?: number; email?: string; searchTerm?: string }) => {
                const queryParams: any = {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                };

                if (params?.email) {
                    queryParams.email = params.email;
                }

                if (params?.searchTerm) {
                    queryParams.searchTerm = params.searchTerm;
                }

                return {
                    url: "/quote",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["Quote"],
        }),

        // GET: Single quote
        getQuoteById: builder.query({
            query: (id) => `/quote/${id}`,
            providesTags: ["Quote"],
        }),

        // PATCH: Update quote
        updateQuote: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/quote/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Quote"],
        }),

        // DELETE: Quote
        deleteQuote: builder.mutation({
            query: (id) => ({
                url: `/quote/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Quote"],
        }),

        // POST: Send payment link
        sendPaymentLink: builder.mutation({
            query: (id) => ({
                url: `/quote/send-payment-link/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Quote"],
        }),
    }),
});

export const { useCreateQuoteMutation, useGetAllQuotesQuery, useGetQuoteByIdQuery, useUpdateQuoteMutation, useDeleteQuoteMutation, useSendPaymentLinkMutation } = quoteApi;
