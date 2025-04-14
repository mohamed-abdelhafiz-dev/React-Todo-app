import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  GlobalStyles,
  Fab,
  Zoom,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import TodosContextProvider from "./contexts/TodosContextProvider";

function App() {
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem("mode")) ?? "light"
  );
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Save the theme mode to localStorage whenever it changes
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    // Show/hide the scroll-to-top button based on the scroll position
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#ddd" : "#222",
        paper: mode === "light" ? "#ccc" : "#333",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ".App": {
            transition: "background-color 0.5s ease, color 0.5s ease",
          },
        }}
      />
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
          <TodosContextProvider>
            <TodoList />
          </TodosContextProvider>
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
      </Box>
    </ThemeProvider>
  );
}

export default App;
