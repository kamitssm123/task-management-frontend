import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import storage from "../utils/storageUtils";
import { IS_AUTHENTICATED, TOKEN } from "../constants/storageKeys";
import { loginApi } from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!storage.get<boolean>(IS_AUTHENTICATED));

  // TODO: implement method
  const login = useCallback(async (email: string, password: string) => {
    console.log("Hello Ji");
    const data = await loginApi({ email, password });
    if(!data){
      return
    }
    storage.set(IS_AUTHENTICATED, true);
    storage.set(TOKEN, data.token);
    setIsAuthenticated(true);
  }, []);

  // TODO: implement method
  const logout = useCallback(() => {
    storage.remove(IS_AUTHENTICATED);
    setIsAuthenticated(false);
  }, []);

  const contextValue = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
