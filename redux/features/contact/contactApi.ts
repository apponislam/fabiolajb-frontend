import { baseApi } from "@/redux/api/baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contactData) => ({
                url: "/public/contact",
                method: "POST",
                body: contactData,
            }),
        }),
        getAllContacts: builder.query({
            query: () => "/public/contact",
        }),
    }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
