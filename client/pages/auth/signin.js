import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: () => {
      Router.push("/");
      setEmail("");
      setPassword("");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        {errors}
        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
};

export default signin;
