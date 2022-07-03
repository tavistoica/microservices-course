import { useState } from "react";
import Link from "next/link";
import { HEADER } from "../../../utils/constants";
import { slide as Menu } from "react-burger-menu";
import { USER_TYPES } from "@ostoica/common";

import styles from "./Header.module.css";

const generateNavBar = (currentUser, setCloseSideBar = null) => {
  const links = [
    !currentUser && { label: HEADER.REGISTER, href: "/auth/register" },
    !currentUser && { label: HEADER.LOGIN, href: "/auth/login" },
    currentUser && { label: HEADER.PROFILE, href: "/auth/profile" },
    currentUser &&
      currentUser.role === "Resturant" && {
        label: HEADER.SELL,
        href: "/meals/new",
      },
    currentUser &&
      currentUser.role === "Resturant" && {
        label: HEADER.SCAN,
        href: "/orders/scan",
      },
    currentUser &&
      currentUser.role === USER_TYPES.CUSTOMER && {
        label: HEADER.ORDERS,
        href: "/orders",
      },
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

  const bmStyles = {
    ["bmMenu"]: styles["bm-menu"],
    ["bmBurgerBarsHover"]: styles["bm-burger-bars-hover"],
  };

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
          menuClassName={styles["bm-menu"]}
          itemListClassName={styles["bm-menu"]}
          crossClassName={styles["cross-button"]}
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
