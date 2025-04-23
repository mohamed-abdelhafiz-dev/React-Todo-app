import { createSlice } from "@reduxjs/toolkit";
import { v4 as uniqueId } from "uuid";

function saveInLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todosList: JSON.parse(localStorage.getItem("todos")) ?? [],
    newTodoInput: "",
    filtering: "All",
    editedTodo: {
      title: "",
      description: "",
    },
    modalTodo: {},
  },
  reducers: {
    addTodo: (state, action) => {
      state.todosList = [
        ...state.todosList,
        {
          id: uniqueId(),
          title: action.payload.title,
          description: "",
          completed: false,
        },
      ];
      saveInLocalStorage(state.todosList);
    },
    editTodo: (state, action) => {
      state.todosList = state.todosList.map((todo) => {
        return todo.id !== action.payload.modalTodo.id
          ? todo
          : {
              ...todo,
              title: action.payload.editedTodo.title,
              description: action.payload.editedTodo.description,
            };
      });
      saveInLocalStorage(state.todosList);
    },
    deleteTodo: (state, action) => {
      state.todosList = state.todosList.filter((todo) => {
        return todo.id !== action.payload.todoItem.id;
      });
      saveInLocalStorage(state.todosList);
    },
    completeTodo: (state, action) => {
      state.todosList = state.todosList.map((todo) => {
        return todo.id === action.payload.todoItem.id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
      saveInLocalStorage(state.todosList);
    },
    changeNewTodoInput: (state, action) => {
      state.newTodoInput = action.payload;
    },
    changeFiltering: (state, action) => {
      state.filtering = action.payload;
    },
    changeEditedTodo: (state, action) => {
      state.editedTodo = action.payload;
    },
    changeModalTodo: (state, action) => {
      state.modalTodo = action.payload;
    },
  },
});

export default todosSlice.reducer;

export const {
  addTodo,
  editTodo,
  deleteTodo,
  completeTodo,
  changeEditedTodo,
  changeFiltering,
  changeModalTodo,
  changeNewTodoInput,
} = todosSlice.actions;
