import { Snackbar, Alert } from "@mui/material";
import { useSnackbarContext } from "../contexts/SnackbarContext";


export default function SnackbarAlert() {
  const [snackbarState, setSnackbarState] = useSnackbarContext();
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState({
      open: false,
      message: snackbarState.message,
      severity: snackbarState.severity,
    });
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
