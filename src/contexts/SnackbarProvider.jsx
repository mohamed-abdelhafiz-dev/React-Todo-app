import { useState } from "react";
import SnackbarAlert from "../components/SnackbarAlert";
import { SnackbarContext } from "./SnackbarContext";

export default function SnackBarProvider({ children }) {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <SnackbarContext.Provider value={[snackbarState, setSnackbarState]}>
      <SnackbarAlert />
      {children}
    </SnackbarContext.Provider>
  );
}
