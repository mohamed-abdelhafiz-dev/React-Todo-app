import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Grid,
} from "@mui/material";
import Todo from "./Todo";
import { useState } from "react";
import { v4 as uniqueId } from "uuid"; // Use uuid for unique IDs
import { todosContext } from "../contexts/todosContext.js";
export default function TodoList() {
  const [filtering, setFiltering] = useState("All");
  const [Todos, setTodos] = useState([
    {
      id: uniqueId(),
      title: "Task One",
      description: "this a very important task!",
      completed: false,
    },
    {
      id: uniqueId(),
      title: "Task Two",
      description: "this a very important task 2 !",
      completed: false,
    },
    {
      id: uniqueId(),
      title: "Task Three",
      description: "this a very important task 3 !",
      completed: false,
    },
  ]);
  const [newTaskInput, setNewTaskInput] = useState("");

  const TodosList = Todos.filter((todo) => {
    if (filtering === "All") return true;
    return filtering === "Completed" ? todo.completed : !todo.completed;
  }).map((todo) => <Todo key={todo.id} todoItem={todo} />);

  function handleAddBtn() {
    if (newTaskInput) {
      setTodos([
        ...Todos,
        {
          id: uniqueId(),
          title: newTaskInput,
          description: "",
          completed: false,
        },
      ]);
      setNewTaskInput("");
    }
  }
  return (
    <todosContext.Provider value={[Todos, setTodos]}>
      <div className="todoCard">
        <Card sx={{ minWidth: 275, textAlign: "center", my: 10 }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontStyle: "italic" }}>
              TODO
            </Typography>
            <Divider sx={{ mt: -2, mb: 2 }} />

            {/* tasks filter */}
            <ToggleButtonGroup
              value={filtering}
              exclusive
              onChange={(e) => {
                setFiltering(e.target.value);
              }}
              aria-label="text alignment"
              sx={{ mt: 1 }}
            >
              <ToggleButton sx={{ textTransform: "none" }} value="All">
                All
              </ToggleButton>
              <ToggleButton sx={{ textTransform: "none" }} value="Completed">
                Completed
              </ToggleButton>
              <ToggleButton sx={{ textTransform: "none" }} value="Uncompleted">
                Uncompleted
              </ToggleButton>
            </ToggleButtonGroup>
            {/* --tasks filter-- */}

            {/*TODOS */}
            {TodosList}
            {/* --TODOS-- */}
          </CardContent>
          <CardActions>
            <Grid container spacing={1} sx={{ width: "100%" }}>
              <Grid size={9}>
                <TextField
                  id="outlined-basic"
                  label="New task"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={newTaskInput}
                  onChange={(e) => {
                    setNewTaskInput(e.target.value.trim());
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddBtn();
                    }
                  }}
                />
              </Grid>
              <Grid size={3}>
                <Button
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontSize: "18px",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                  color="error"
                  onClick={handleAddBtn}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </todosContext.Provider>
  );
}
