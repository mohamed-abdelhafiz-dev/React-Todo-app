import { create } from "zustand";
const useTodosState = create((set) => ({
  todos: [],
  setTodos: (newTodos) => set({ todos: newTodos }),
}));
export default useTodosState;
