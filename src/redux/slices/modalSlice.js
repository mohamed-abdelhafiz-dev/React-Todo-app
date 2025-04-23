import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    editModalIsOpen: false,
    deleteModalIsOpen: false,
  },
  reducers: {
    showEditModal: (state, action) => {
      state.editModalIsOpen = action.payload;
    },
    showDeleteModal: (state, action) => {
      state.deleteModalIsOpen = action.payload;
    },
  },
});
export default modalSlice.reducer;
export const { showDeleteModal, showEditModal } = modalSlice.actions;
