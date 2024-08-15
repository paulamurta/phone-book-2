export interface IAuthProvider {
  children: JSX.Element;
}

export interface IAuthContext {
  name: string | null;
  email: string | null;
  isLogout: boolean;
  setIsLogout: React.Dispatch<React.SetStateAction<boolean>>;
  errorLogin: boolean;
  setErrorLogin: any;
  token: string | null;
  logout?: () => void;
  fetchMyData: () => void;
  login: (email: string, password: string) => void;
}
