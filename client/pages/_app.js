import "bootstrap/dist/css/bootstrap.css";
import axios from "../api/axios";
import { Header } from "..//components/organisms/Header/Header";
import { AuthProvider } from "../context/auth-provider";

import "./styles.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container">
        <AuthProvider>
          <Component currentUser={currentUser} {...pageProps} />
        </AuthProvider>
      </div>
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  if (appContext?.ctx?.req?.headers?.cookie) {
    // it runs on server side
    axios.defaults.headers.get.Cookie = appContext.ctx.req.headers.cookie;
  }
  const { data } = await axios.get("/api/users/currentuser", {
    withCredentials: true,
  });

  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      data.currentUser
    );
  }
  return { pageProps, ...data };
};

export default AppComponent;
