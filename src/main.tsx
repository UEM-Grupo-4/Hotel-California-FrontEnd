import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth/AuthProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toast";
import { ErrorBoundary } from "./components/AppErrorBoundary/AppErrorBoundary";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Suspense fallback={<LoadingPage open={true} />}>
              <ErrorBoundary>
                <AppRouter />
                <ToastContainer />
              </ErrorBoundary>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>,
);
