import Link from "next/link";
import { HEADER } from "../../utils/constants";

import styles from "./Header.module.css";

const generateNavBar = (currentUser) => {
  const links = [
    !currentUser && { label: HEADER.REGISTER, href: "/auth/register" },
    !currentUser && { label: HEADER.LOGIN, href: "/auth/login" },
    currentUser && { label: HEADER.SELL, href: "/tickets/new" },
    currentUser && { label: HEADER.ORDERS, href: "/orders" },
    currentUser && { label: HEADER.LOGOUT, href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-link">
          <Link
            href={href}
            style={{ textDecoration: "none" }}
            className="navigationitem"
          >
            {label}
          </Link>
        </li>
      );
    });

  return links;
};

export const Header = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className={`${styles.container}`}>
        <Link className={styles.logo} href="/">
          <a className="navbar-brand">{HEADER.LOGO}</a>
        </Link>
        <div className={`${styles.navigation} d-flex justify-content-end`}>
          <ul className={`nav d-flex align-items-center`}>
            {generateNavBar(currentUser)}
          </ul>
        </div>
      </div>
    </nav>
  );
};
