import { baseApi } from "@/redux/api/baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contactData) => ({
                url: "/public/contact",
                method: "POST",
                body: contactData,
            }),
            invalidatesTags: ["Contact"],
        }),
        getAllContacts: builder.query({
            query: (params?: { page?: number; limit?: number; searchTerm?: string }) => {
                const queryParams: any = {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                };

                if (params?.searchTerm) {
                    queryParams.searchTerm = params.searchTerm;
                }

                return {
                    url: "/public/contact",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["Contact"],
        }),
    }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
