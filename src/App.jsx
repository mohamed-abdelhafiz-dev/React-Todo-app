import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  Fab,
  Zoom,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TodoList from "./components/TodoList";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SnackbarAlert from "./components/SnackbarAlert";
import { changeMode } from "./redux/slices/modeSlice";

function App() {
  const mode = useSelector((state) => state.mode);
  const showScroll = useSelector((state) => state.showScroll);
  const dispatch = useDispatch();
  useEffect(() => {
    // Save the theme mode to localStorage whenever it changes
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    // Show/hide the scroll-to-top button based on the scroll position
    const handleScroll = () => {
      dispatch({
        type: "setShowScroll",
        payload: window.scrollY > 300,
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    dispatch(changeMode());
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        background: {
          default: mode === "light" ? "#ddd" : "#222",
          paper: mode === "light" ? "#ccc" : "#333",
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App flex-center"
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default", // Correct usage for background color
          color: "text.primary",
          position: "relative",
        }}
      >
        <Container maxWidth="sm">
          {/* Theme Toggle Button */}
          <Box
            sx={{
              position: "fixed",
              top: 15,
              right: 20,
              zIndex: 1000,
              "@media (max-width:800px)": { position: "absolute" },
            }}
          >
            <Tooltip
              title={
                mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <IconButton
                onClick={handleToggle}
                aria-label="toggle theme"
                sx={{
                  color: mode === "dark" ? "yellow.400" : "grey.800",
                  bgcolor: mode === "dark" ? "grey.900" : "grey.100",
                  "&:hover": {
                    bgcolor: mode === "dark" ? "grey.800" : "grey.200",
                  },
                  borderRadius: "50%",
                  boxShadow: 3,
                  p: 1,
                }}
              >
                {mode === "dark" ? (
                  <LightModeIcon sx={{ fontSize: 28 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 28 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Todo List */}
          <TodoList />
        </Container>

        {/* Scroll to Top Button */}
        <Zoom in={showScroll}>
          <Fab
            color="primary"
            size="medium"
            onClick={handleScrollTop}
            aria-label="scroll back to top"
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              zIndex: 1000,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>

        {/* SnackbarAlert */}
        <SnackbarAlert />
      </Box>
    </ThemeProvider>
  );
}

export default App;
