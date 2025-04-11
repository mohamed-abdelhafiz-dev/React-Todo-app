import { Container } from "@mui/material";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className={`App flex-center`} style={{ minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
