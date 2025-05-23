import { Snackbar, Alert } from "@mui/material";
import { showSnackbar } from "../redux/slices/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SnackbarAlert() {
  const snackbarState = useSelector((state) => state.snackbarState);
  const dispatch = useDispatch();
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      showSnackbar({
        open: false,
        message: snackbarState.message,
        severity: snackbarState.severity,
      })
    );
  };

  return (
    <div>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
