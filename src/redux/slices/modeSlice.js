import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: JSON.parse(localStorage.getItem("mode")) || "light",
  reducers: {
    changeMode: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});
export default modeSlice.reducer;
export const { changeMode } = modeSlice.actions;
