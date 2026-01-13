import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../../user/types/user.types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Lỗi parse user", e);
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userInfo: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
