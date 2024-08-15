import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../contexts/AuthContext";
import { getTokenLocalStorage } from "../../contexts/AuthContext/utils";
import { ToastContainer } from "../ToastContainer";
import RoutesMain from "../../routes";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/themes/theme";
import GlobalStyle from "../../styles/global";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const tokenByLocalStorage = getTokenLocalStorage();

  useEffect(() => {
    if (tokenByLocalStorage && window.location.pathname === "/login") {
      window.location.href = "/contacts";
    }
  }, [tokenByLocalStorage]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalStyle />
        <AuthProvider>
          <RoutesMain />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
