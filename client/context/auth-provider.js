import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const persistItem =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("persist"))
      : false;

  const [persist, setPersist] = useState(persistItem || false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
