import React, { createContext, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const persistItem =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("persist"))
      : false;

  const [persist, setPersist] = useState(persistItem || false);
  const values = useMemo(() => ({
    auth,
    setAuth,
    persist,
    setPersist,
  }));

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
