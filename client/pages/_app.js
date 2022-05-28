import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
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
  const client = buildClient(appContext.ctx);
  const {
    data,
  } = await axios.get(`https://www.tavistoica.xyz/api/users/currentuser`, {
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
