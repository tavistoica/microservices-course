import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import { route } from "next/dist/next-server/server/router";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
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
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
