// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

// export type TUser = {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     image: string;
// };

// type AuthState = {
//     user: TUser | null;
//     accessToken: string | null;
// };

// const initialState: AuthState = {
//     user: null,
//     accessToken: null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setCredentials: (
//             state,
//             action: PayloadAction<{
//                 user: TUser;
//                 accessToken: string;
//             }>
//         ) => {
//             state.user = action.payload.user;
//             state.accessToken = action.payload.accessToken;
//         },
//         setToken: (state, action: PayloadAction<string>) => {
//             state.accessToken = action.payload;
//         },
//         logout: (state) => {
//             state.user = null;
//             state.accessToken = null;
//         },
//     },
// });

// export const { setCredentials, setToken, logout } = authSlice.actions;
// export default authSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectAccessToken = (state: RootState) => state.auth.accessToken;
// export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
};

type AuthState = {
    user: TUser | null;
    accessToken: string | null;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: TUser;
                accessToken: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;
