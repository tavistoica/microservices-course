import { useRouter } from "next/router";
import { useEffect } from "react";

import { LOGOUT_PAGE } from "../../utils/constants";
import useLogout from "../../hooks/use-logout";

const signout = () => {
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    setTimeout(() => {
      logout();
      router.push("/");
    }, 1000);
  }, []);

  return <div>{LOGOUT_PAGE.MESSAGE}</div>;
};

export default signout;
