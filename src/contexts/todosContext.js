import { create } from "zustand";
const useTodosState = create((set) => ({
  todos: JSON.parse(localStorage.getItem("todos")) ?? [],
  setTodos: (newTodos) => set({ todos: newTodos }),
}));
export default useTodosState;
