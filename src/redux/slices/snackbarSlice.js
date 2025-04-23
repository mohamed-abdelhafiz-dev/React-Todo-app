import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "",
  },
  reducers: {
    showSnackbar: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export default snackbarSlice.reducer;
export const { showSnackbar } = snackbarSlice.actions;
