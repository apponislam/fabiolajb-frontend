import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: { email: string; password: string }) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data: { email: string; oneTimeCode: number }) => ({
                url: "/auth/verify-email",
                method: "POST",
                body: data,
            }),
        }),
        forgetPassword: builder.mutation({
            query: (data: { email: string }) => ({
                url: "/auth/forget-password",
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ body, token }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }),
        }),
        changePassword: builder.mutation({
            query: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useVerifyEmailMutation, useForgetPasswordMutation, useResetPasswordMutation, useChangePasswordMutation } = authApi;
