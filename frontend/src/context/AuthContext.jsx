import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("sourceXUser");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("sourceXToken") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("sourceXToken", token);
    } else {
      localStorage.removeItem("sourceXToken");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "sourceXUser",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("sourceXUser");
    }
  }, [user]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};