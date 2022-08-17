import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { LOGOUT_PAGE } from "../../utils/constants";
import useLogout from "../../hooks/use-logout";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

const signout = () => {
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    setTimeout(() => {
      logout();
      router.push("/");
    }, 1000);
  }, []);

  return <PersistLogin>{LOGOUT_PAGE.MESSAGE}</PersistLogin>;
};

export default signout;
