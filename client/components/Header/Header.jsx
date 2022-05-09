import Link from "next/link";
import { HEADER } from "../../utils/constants";
import { slide as Menu } from "react-burger-menu";

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
    <nav className="navbar-light bg-light">
      <div className={styles["nav-hamburger"]}>
        <Menu pageWrapId={"page-wrap"} outerContainerId={"App"} right>
          {generateNavBar(currentUser)}
        </Menu>
      </div>
      <div className={`${styles.container} ${styles.navigation}`}>
        <Link className={styles.logo} href="/">
          <a className="navbar-brand">{HEADER.LOGO}</a>
        </Link>
        <div className={`d-flex justify-content-end`}>
          <ul className={`nav d-flex`}>{generateNavBar(currentUser)}</ul>
        </div>
      </div>
    </nav>
  );
};
