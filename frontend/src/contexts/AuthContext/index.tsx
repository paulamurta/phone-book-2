import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTokenLocalStorage } from "./utils";
import toast from "react-hot-toast";
import { IAuthContext, IAuthProvider } from "./types";
import api from "../../services/Api";
import { whoAmI } from "../../services/users.service";

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
        setTokenLocalStorage(response?.data?.accessToken);
        setErrorLogin(false);
        navigate("/contacts");
        toast.success("Login successful! Welcome back!");
      })
      .catch(async (error) => {
        toast.dismiss();
        setErrorLogin(true);
        toast.error(error?.response?.data?.message);
      });
  }

  async function logout() {
    localStorage.removeItem("token");
    setIsLogout(true);
    navigate("/home");
  }

  async function fetchMyData() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await whoAmI();
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
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
