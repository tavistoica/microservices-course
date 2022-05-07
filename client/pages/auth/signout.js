import { Router } from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/use-request";

const signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/logout",
    method: "post",
    body: { data: {} },
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default signout;
