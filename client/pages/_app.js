import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import { Header } from "../components/Header/Header";

import "./styles.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  if (appContext?.ctx?.req?.headers?.cookie) {
    // it runs on server side
    axios.defaults.headers.get.Cookie = appContext.ctx.req.headers.cookie;
  }
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser", {
    withCredentials: true,
  });

  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return { pageProps, ...data };
};

export default AppComponent;
