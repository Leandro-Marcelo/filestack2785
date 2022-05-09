import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aPost } from "../../axios";

const initialState = {
    result: [],
};

export const validate = createAsyncThunk(
    "auth/validate",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/validate");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        cleanUpToast(state, action) {
            state.statusLogin = "";
            state.statusSignUp = "";
        },
    },
    extraReducers: {
        [validate.pending]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* isFetching */
                status: "",
                /* message */
                message: "",
            };
        },
        [validate.fulfilled]: (state, action) => {
            /* console.log(`que llega acá:`, action.payload); */
            // state.todos.push(action.payload);
            return {
                ...state,
                /* si success es true entonces es que validate fue bien eso significa que esta logeado, es decir, logged:true */
                logged: action.payload.success,
                user: action.payload.user,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                status: "success",
                /* message */
                message: "",
            };
        },
        [validate.rejected]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                status: "rejected",
                /* message */
                message: "",
            };
        },
    },
});

export const { cleanUpToast } = authSlice.actions; // Esto se utiliza en el dispatch
export default authSlice.reducer; // Esto en el store
