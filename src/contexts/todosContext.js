import { createContext, useContext } from "react";

const TodosContext = createContext([]);
export default TodosContext;

export function useTodosContext() {
  return useContext(TodosContext);
};
