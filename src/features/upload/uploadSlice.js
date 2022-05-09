import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aGet, aPost } from "../../axios";

const initialState = {
    images: [],
    getDataLoading: true,
    getImagesStatus: "loader",
    postDataLoading: false,
    postDatas: false,

    /*     getTeamsStatus: "",
    getTeamsError: "",
    addTeamStatus: "",
    addTeamError: "",
    updateTeamStatus: "",
    updateTeamError: "",
    deleteTeamStatus: "",
    deleteTeamError: "", */
};

export const getImages = createAsyncThunk(
    "upload/getImages",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aGet("/all");
            console.log(`response`);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const createImage = createAsyncThunk(
    "upload/createImage",
    async (datas, { rejectWithValue }) => {
        try {
            const response = await aPost("/", datas);
            console.log(`response`);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        cleanUpToast(state, action) {
            state.statusLogin = "";
            state.statusSignUp = "";
        },
    },
    extraReducers: {
        [getImages.pending]: (state, action) => {
            return {
                ...state,
                images: [],
                getDataLoading: true,
            };
        },
        [getImages.fulfilled]: (state, action) => {
            return {
                ...state,
                images: action.payload,
                getDataLoading: false,
            };
        },
        [getImages.rejected]: (state, action) => {
            return {
                ...state,
                images: [],
                getDataLoading: true,
            };
        },
        [createImage.pending]: (state, action) => {
            return {
                ...state,
                postDataLoading: true,
            };
        },
        [createImage.fulfilled]: (state, action) => {
            const updatedImages = [action.payload, ...state.images];
            /*     console.log(JSON.stringify(state.images));
            console.log(JSON.stringify(action.payload)); */
            return {
                ...state,
                postDatas: true,
                images: updatedImages,
                postDataLoading: false,
            };
        },
        [createImage.rejected]: (state, action) => {
            return {
                ...state,
                postDataLoading: false,
            };
        },
    },
});

export const { cleanUpToast } = uploadSlice.actions; // Esto se utiliza en el dispatch
export default uploadSlice.reducer; // Esto en el store
