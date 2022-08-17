import "bootstrap/dist/css/bootstrap.css";
import axios from "../api/axios";
import { Header } from "..//components/organisms/Header/Header";
import { AuthProvider } from "../context/auth-provider";

import "./styles.css";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
};

export const getServerSideProps = async (context) => {
  if (context?.ctx?.req?.headers?.cookie) {
    // it runs on server side
    axios.defaults.headers.get.Cookie = context.ctx.req.headers.cookie;
  }

  let data = null;
  if (context?.ctx?.req?.headers?.cookie) {
    try {
      const response = await axios.get("/api/users/currentuser", {
        withCredentials: true,
      });
      data = response;
    } catch (err) {
      console.log(err);
    }
  }

  // let pageProps;
  // if (context.Component.getInitialProps) {
  //   pageProps = await context.Component.getInitialProps(
  //     context.ctx,
  //     data ? data?.currentUser : null
  //   );
  // }
  return { props: data };
};

export default AppComponent;
