import modeReducer from "./slices/modeSlice";
import todosReducer from "./slices/todosSlice";
import showScrollReducer from "./slices/scrollSlice";
import snackbarStateReducer from "./slices/snackbarSlice";
import modalReducer from "./slices/modalSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    mode: modeReducer,
    modal: modalReducer,
    snackbarState: snackbarStateReducer,
    showScroll: showScrollReducer,
    todos: todosReducer,
  },
});
export default store;
