import { useRouter } from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/use-request";

import { LOGOUT_PAGE } from "../../utils/constants";

const signout = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "/api/users/logout",
    method: "post",
    body: { data: {} },
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>{LOGOUT_PAGE.MESSAGE}</div>;
};

export default signout;
