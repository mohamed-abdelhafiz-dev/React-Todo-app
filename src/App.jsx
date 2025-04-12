import TodoList from "./components/TodoList";
import ModeToggler from "./components/ModeToggler";
import { Container } from "@mui/material";

function App() {
  return (
    <div className={`App flex-center`} style={{ minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <ModeToggler />
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
