import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { setTokenLocalStorage, setUserIdLocalStorage } from "./utils";
import toast from "react-hot-toast";
import { IAuthContext, IAuthProvider } from "./types";
import { whoAmI } from "../../services/auth.service";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  async function login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };

    await api
      .post("auth/login", body)
      .then((response) => {
        setTokenLocalStorage(response.data.token);
        setUserIdLocalStorage(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setErrorLogin(false);
        navigate("/home");
      })
      .catch(async (error) => {
        toast.dismiss();
        setErrorLogin(true);
        toast.error(error.response?.data?.message || "An error ocurred");
      });
  }

  async function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsLogout(true);
    navigate("/login");
  }

  async function fetchMyData() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await whoAmI();
        const userData = response.data;
        setName(userData.name);
      } catch (error) {}
    }
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        errorLogin,
        setErrorLogin,
        name,
        email,
        fetchMyData,
        logout,
        isLogout,
        setIsLogout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
