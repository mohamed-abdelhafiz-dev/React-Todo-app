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
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Dialog,
  Alert,
} from "@mui/material";
import Todo from "./Todo";
import { useEffect, useMemo, useState } from "react";
import { v4 as uniqueId } from "uuid"; // Use uuid for unique IDs
import useTodosState from "../contexts/todosContext";
export default function TodoList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [filtering, setFiltering] = useState("All");
  const todos = useTodosState((state) => state.todos);
  const setTodos = useTodosState((state) => state.setTodos);
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
  });

  const titleEditIsEmpty = useMemo(() => {
    return editTodo.title.trim().length === 0;
  }, [editTodo.title]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [newTaskInput, setNewTaskInput] = useState("");

  const TodosList = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filtering === "All") return true;
        return filtering === "Completed" ? todo.completed : !todo.completed;
      })
      .map((todo) => (
        <Todo
          key={todo.id}
          todoItem={todo}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ));
  }, [todos, filtering]);

  //handle functions
  function handleAddBtn() {
    if (newTaskInput.trim()) {
      const newTodos = [
        ...todos,
        {
          id: uniqueId(),
          title: newTaskInput,
          description: "",
          completed: false,
        },
      ];
      setTodos(newTodos);
      setNewTaskInput("");
    }
  }

  function handleEditClick(todoItem) {
    setShowEditModal(true);
    setCurrentTodo(todoItem);
    setEditTodo({
      title: todoItem.title,
      description: todoItem.description,
    });
  }
  function handleEditConfirmation() {
    if (editTodo.title.trim().length === 0) {
      return;
    }

    const newTodos = todos.map((todo) => {
      return todo.id !== currentTodo.id
        ? todo
        : {
            ...todo,
            title: editTodo.title,
            description: editTodo.description,
          };
    });
    setTodos(newTodos);
    setShowEditModal(false);
  }
  function handleEditClose() {
    setShowEditModal(false);
  }

  function handleDeleteClick(todoItem) {
    setShowDeleteModal(true);
    setCurrentTodo(todoItem);
  }
  function handleDeleteConfirmation() {
    const newTodos = todos.filter((todo) => {
      return todo.id !== currentTodo.id;
    });
    setTodos(newTodos);
    setShowDeleteModal(false);
  }
  function handleDeleteClose() {
    setShowDeleteModal(false);
  }
  //handle functions//

  return (
    <>
      {/* Edit Modal */}
      <Dialog
        slotProps={{
          paper: {
            style: {
              width: "476px",
            },
          },
        }}
        open={showEditModal}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Editing '{currentTodo.title}' todo..
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="Title"
            name="task title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.title}
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEditConfirmation();
              }
            }}
          />
          {titleEditIsEmpty && (
            <Alert severity="error">Todo title is required.</Alert>
          )}
          <TextField
            margin="dense"
            id="Description"
            name="task description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={editTodo.description}
            onChange={(e) => {
              setEditTodo({ ...editTodo, description: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEditConfirmation();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={handleEditClose}
            sx={{ textTransform: "capitalize", fontSize: 17 }}
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={handleEditConfirmation}
            sx={{ textTransform: "capitalize", fontSize: 17 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal  */}
      <Dialog
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            document.activeElement !== document.querySelector(".closeBtn")
          ) {
            e.preventDefault();
            handleDeleteConfirmation();
          }
        }}
        open={showDeleteModal}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete '{currentTodo.title}' ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This todo will be deleted immediately. You can't undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="closeBtn"
            color="inherit"
            onClick={handleDeleteClose}
            sx={{ textTransform: "capitalize", fontSize: 17 }}
          >
            Close
          </Button>
          <Button
            onClick={handleDeleteConfirmation}
            color="error"
            sx={{ textTransform: "capitalize", fontSize: 17 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className="todoCard">
        <Card sx={{ minWidth: 275, textAlign: "center", my: 10 }}>
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                fontStyle: "italic",
                fontWeight: 600,
                fontFamily: "serif",
                fontSize: 35,
              }}
            >
              TODO
            </Typography>
            <Divider sx={{ mt: 0, mb: 2 }} />

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
                  slotProps={{
                    input: {
                      style: {
                        height: "50px",
                      },
                    },
                  }}
                  value={newTaskInput}
                  onChange={(e) => {
                    setNewTaskInput(e.target.value);
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
                  color="primary"
                  disabled={newTaskInput.trim().length === 0}
                  onClick={handleAddBtn}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
