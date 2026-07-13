import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem("access")
  );

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (access) {
      setToken(access);
    }
  }, []);

  const login = (accessToken, refreshToken) => {

    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);

    setToken(accessToken);

  };

  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setToken(null);

    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}