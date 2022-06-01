import { useState } from "react";
import Link from "next/link";
import { HEADER } from "../../utils/constants";
import { slide as Menu } from "react-burger-menu";

import styles from "./Header.module.css";

const generateNavBar = (currentUser, setCloseSideBar = null) => {
  const links = [
    !currentUser && { label: HEADER.REGISTER, href: "/auth/register" },
    !currentUser && { label: HEADER.LOGIN, href: "/auth/login" },
    currentUser && { label: HEADER.PROFILE, href: "/auth/profile" },
    currentUser &&
      currentUser.role === "Seller" && {
        label: HEADER.SELL,
        href: "/meals/new",
      },
    currentUser &&
      currentUser.role === "Seller" && {
        label: HEADER.SCAN,
        href: "/orders/scan",
      },
    currentUser &&
      currentUser.role === "User" && { label: HEADER.ORDERS, href: "/orders" },
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
            <a onClick={setCloseSideBar}>{label}</a>
          </Link>
        </li>
      );
    });

  return links;
};

export const Header = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => setIsOpen(!isOpen);
  const setCloseSideBar = () => setIsOpen(false);

  return (
    <nav className="navbar-light bg-light">
      <div className={styles["nav-hamburger"]}>
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          right
          isOpen={isOpen}
          onClose={handleIsOpen}
          onOpen={handleIsOpen}
        >
          {generateNavBar(currentUser, setCloseSideBar)}
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
