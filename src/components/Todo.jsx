import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

import useTodosState from "../contexts/todosContext";
import { useEffect } from "react";

export default function Todo({ todoItem, handleEditClick, handleDeleteClick }) {
  const todos = useTodosState((state) => state.todos);
  const setTodos = useTodosState((state) => state.setTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function handleCompleteCheck() {
    const newTodos = todos.map((todo) => {
      return todo.id === todoItem.id
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    setTodos(newTodos);
  }
  return (
    <>
      <Card
        sx={{
          paddingTop: "7px",
          textAlign: "left",
          bgcolor: "#6b707f",
          color: "white",
          mt: 1.5,
          transition: "all 0.2s",
          ":hover": {
            paddingY: "10px",
            boxShadow: "0px 7px 7px rgb(0,0,0,0.4)",
          },
        }}
      >
        <Grid container>
          <Grid size={{ xs: 6, sm: 7, md: 7, lg: 7 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={
                  todoItem.completed
                    ? {
                        textDecoration: "line-through",
                        fontWeight: "100",
                        color: "darkgrey",
                      }
                    : ""
                }
              >
                {todoItem.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "lightgrey", fontSize: "14px" }}
              >
                {todoItem.description}
              </Typography>
            </CardContent>
          </Grid>
          <Grid size={{ xs: 6, sm: 5, md: 5, lg: 5 }}>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <IconButton
                sx={
                  todoItem.completed
                    ? {
                        bgcolor: "#28a745",
                        color: "white",
                        border: "3px solid #28a745",
                        transition: "all 0.2s",
                        ":hover": {
                          bgcolor: "white",
                          color: "#28a745",
                          boxShadow: "0px 7px 7px rgb(0,0,0,0.4)",
                        },
                      }
                    : {
                        bgcolor: "white",
                        color: "#28a745",
                        border: "3px solid #28a745",
                        transition: "all 0.2s",
                        ":hover": {
                          bgcolor: "#28a745",
                          color: "white",
                          boxShadow: "0px 7px 7px rgb(0,0,0,0.4)",
                        },
                      }
                }
                onClick={handleCompleteCheck}
              >
                <CheckIcon
                  sx={{ "@media (max-width:400px)": { fontSize: "16px" } }}
                />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "white",
                  color: "#1769aa",
                  border: "3px solid #1769aa",
                  transition: "all 0.2s",
                  ":hover": {
                    bgcolor: "#1769aa",
                    color: "white",
                    boxShadow: "0px 7px 7px rgb(0,0,0,0.4)",
                  },
                }}
                onClick={() => {
                  handleEditClick(todoItem);
                }}
              >
                <EditIcon
                  sx={{ "@media (max-width:400px)": { fontSize: "16px" } }}
                />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "white",
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                  transition: "all 0.2s",
                  ":hover": {
                    bgcolor: "#b23c17",
                    color: "white",
                    boxShadow: "0px 7px 7px rgb(0,0,0,0.4)",
                  },
                }}
                onClick={() => {
                  handleDeleteClick(todoItem);
                }}
              >
                <DeleteIcon
                  sx={{ "@media (max-width:400px)": { fontSize: "16px" } }}
                />
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
