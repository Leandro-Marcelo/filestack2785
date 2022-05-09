import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "../features/upload/uploadSlice";

const store = configureStore({
    reducer: {
        upload: uploadSlice,
    },
});

export default store;
