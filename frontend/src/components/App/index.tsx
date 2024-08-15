import "../../assets/styles/global";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getTokenLocalStorage } from "../../context/AuthContext/utils.ts";
import { Routes } from "../../routes";
import { ToastContainer } from "../ToastContainer/index.tsx";
import Providers from "../../context/Providers/index.tsx";

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
      window.location.href = "/home";
    }
  }, [tokenByLocalStorage]);

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <ToastContainer />
        <Routes />
      </Providers>
    </QueryClientProvider>
  );
}
