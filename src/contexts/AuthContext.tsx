import { createContext, ReactNode, useState } from "react";
import UserLogin from "../models/UserLogin";
import { loginUser } from "../services/Service";
// import { toastAlert } from "../utils/toastAlert";

interface AuthContextProps {
  user: UserLogin; // Stores the current logged-in user
  handleLogout: () => void; // Logs out the user
  handleLogin: (userLogin: UserLogin) => Promise<void>; // Handles user login
  isLoading: boolean; // Indicates if a login operation is in progress
}

interface AuthProviderProps {
  children: ReactNode; // Child components that will consume this context
}

// Create AuthContext with an empty default value casted to AuthContextProps
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  // User state to manage logged-in user information
  const [user, setUser] = useState<UserLogin>({
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

  // Loading state to track login process
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user login
  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      await loginUser(`/users/login`, userLogin, setUser); // Adjusted endpoint for better consistency
      // toastAlert("User logged in successfully", "success");
    } catch (error) {
      console.error("Login failed:", error);
      // toastAlert("Invalid user credentials", "error");
    } finally {
      setIsLoading(false); // Ensure loading is stopped even if login fails
    }
  }

  // Function to handle user logout
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
  }

  // Provide the AuthContext to the component tree
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
