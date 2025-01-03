import { createContext, ReactNode, useState, useEffect } from "react";
import UserLogin from "../models/UserLogin";
import { loginUser } from "../services/Service";
import { toastAlert } from "../utils/ToastAlert";

interface AuthContextProps {
  user: UserLogin;
  handleLogout: () => void;
  handleLogin: (userLogin: UserLogin) => Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserLogin>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: 0,
          name: "",
          email: "",
          password: "",
          photo: "",
          cpfCnpj: "",
          type: "",
          date: new Date(),
          token: "",
        };
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      // Passa setUser como callback
      await loginUser(`/users/login`, userLogin, setUser);
      localStorage.setItem("user", JSON.stringify(userLogin)); // Atualiza o localStorage com os dados do usuário
      toastAlert("User logged in successfully", "success");
    } catch (error) {
      console.error("Login failed:", error);
      toastAlert("Invalid user credentials", "error");
    } finally {
      setIsLoading(false);
    }
  }
  

  function handleLogout() {
    setUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      photo: "",
      cpfCnpj: "",
      type: "",
      date: new Date(),
      token: "",
    });
    localStorage.removeItem("user");
    toastAlert("User logged out successfully", "info");
  }

  useEffect(() => {
    if (!user.token) {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
