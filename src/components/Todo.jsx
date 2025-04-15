import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  TextField,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

import { useMemo, useState } from "react";
import useTodosState from "../contexts/todosContext";

export default function Todo({ todoItem }) {
  const todos = useTodosState((state) => state.todos);
  const setTodos = useTodosState((state) => state.setTodos);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: todoItem.title,
    description: todoItem.description,
  });

  //handle functions
  function handleCompleteCheck() {
    const newTodos = todos.map((todo) => {
      return todo.id === todoItem.id
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  function handleEditClick() {
    setShowEditModal(true);
  }
  function handleEditConfirmation() {
    if (editTodo.title.trim().length === 0) {
      return;
    }

    const newTodos = todos.map((todo) => {
      return todo.id !== todoItem.id
        ? todo
        : {
            ...todo,
            title: editTodo.title,
            description: editTodo.description,
          };
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setShowEditModal(false);
  }
  function handleEditClose() {
    setShowEditModal(false);
  }

  function handleDeleteClick() {
    setShowDeleteModal(true);
  }
  function handleDeleteConfirmation() {
    const newTodos = todos.filter((todo) => {
      return todo.id !== todoItem.id;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  function handleDeleteClose() {
    setShowDeleteModal(false);
  }

  //handle functions//

  const titleEditIsEmpty = useMemo(() => {
    return editTodo.title.trim().length === 0;
  }, [editTodo.title]);
  
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
          Editing '{todoItem.title}' todo..
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
        open={showDeleteModal}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete '{todoItem.title}' ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This todo will be deleted immediately. You can't undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
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
                onClick={handleEditClick}
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
                onClick={handleDeleteClick}
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
