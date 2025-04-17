import { useReducer } from "react";
import todosReducer from "../reducers/todosReducer";
import TodosContext from "./TodosContext.js";
export default function TodosProvider({ children }) {
  const [todos, todosDispatch] = useReducer(
    todosReducer,
    JSON.parse(localStorage.getItem("todos")) ?? []
  );

  return (
    <TodosContext.Provider value={[todos, todosDispatch]}>
      {children}
    </TodosContext.Provider>
  );
}
