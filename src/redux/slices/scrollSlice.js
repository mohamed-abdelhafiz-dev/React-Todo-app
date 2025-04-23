import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: false,
  reducers: {
    showScroll: (state, action) => {
      state = action.payload;
    },
  },
});
export default scrollSlice.reducer;
export const { showScroll } = scrollSlice.actions;
