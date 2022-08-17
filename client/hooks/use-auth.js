import { useContext, useDebugValue } from "react";
import AuthContext from "../context/auth-provider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (authData) =>
    authData?.user ? "Logged In" : "Logged Out"
  );
  return useContext(AuthContext);
};

export default useAuth;
