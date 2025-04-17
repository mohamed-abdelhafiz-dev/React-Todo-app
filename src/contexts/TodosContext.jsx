import { createContext, useContext } from "react";

export const TodosContext = createContext([]);
export function useTodosContext() {
  return useContext(TodosContext);
}
