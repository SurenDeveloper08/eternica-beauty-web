// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/montserrat"
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import WebRoutes from './routes/WebRoutes';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Routes >
        <Route path="/*" element={<WebRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
