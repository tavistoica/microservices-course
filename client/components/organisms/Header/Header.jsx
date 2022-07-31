import { useState } from "react";
import Link from "next/link";
import useAuth from "../../../hooks/use-auth";
import { HEADER } from "../../../utils/constants";
import { slide as Menu } from "react-burger-menu";
import { UserEnum } from "@ostoica/common/build/types/user.types";

import styles from "./Header.module.css";

const generateNavBar = (setCloseSideBar = null) => {
  const { auth } = useAuth();
  const isAuth = !!auth.accessToken;

  const links = [
    !isAuth && { label: HEADER.REGISTER, href: "/auth/register" },
    !isAuth && { label: HEADER.LOGIN, href: "/auth/login" },
    isAuth && { label: HEADER.PROFILE, href: "/auth/profile" },
    isAuth &&
      auth.role === UserEnum.Restaurant && {
        label: HEADER.SELL,
        href: "/meals/new",
      },
    isAuth &&
      auth.role === UserEnum.Restaurant && {
        label: HEADER.SCAN,
        href: "/orders/scan",
      },
    isAuth &&
      auth.role === UserEnum.Customer && {
        label: HEADER.ORDERS,
        href: "/orders",
      },
    isAuth && { label: HEADER.LOGOUT, href: "/auth/signout" },
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

export const Header = () => {
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
          menuClassName={styles["bm-menu"]}
          itemListClassName={styles["bm-menu"]}
          crossClassName={styles["cross-button"]}
        >
          {generateNavBar(setCloseSideBar)}
        </Menu>
      </div>
      <div className={`${styles.container} ${styles.navigation}`}>
        <Link className={styles.logo} href="/">
          <a className="navbar-brand">{HEADER.LOGO}</a>
        </Link>
        <div className={`d-flex justify-content-end`}>
          <ul className={`nav d-flex`}>{generateNavBar()}</ul>
        </div>
      </div>
    </nav>
  );
};
