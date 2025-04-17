import { v4 as uniqueId } from "uuid";
export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "addTodo":
      return [
        ...currentTodos,
        {
          id: uniqueId(),
          title: action.payload.title,
          description: "",
          completed: false,
        },
      ];
    case "editTodo":
      return currentTodos.map((todo) => {
        return todo.id !== action.payload.currentTodo.id
          ? todo
          : {
              ...todo,
              title: action.payload.editTodo.title,
              description: action.payload.editTodo.description,
            };
      });
    case "deleteTodo":
      return currentTodos.filter((todo) => {
        return todo.id !== action.payload.todoItem.id;
      });
    case "setToLocalStorage":
      localStorage.setItem("todos", JSON.stringify(currentTodos));
      return currentTodos;
    case "completeTodo":
      return currentTodos.map((todo) => {
        return todo.id === action.payload.todoItem.id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

    default:
      return currentTodos;
  }
}
