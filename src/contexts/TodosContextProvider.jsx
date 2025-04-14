import { useState } from "react";
import TodosContext from "./todosContext";
export default function TodosContextProvider({ children }) {
  const [Todos, setTodos] = useState([]);
  return (
    <TodosContext.Provider value={[Todos, setTodos]}>
      {children}
    </TodosContext.Provider>
  );
}
