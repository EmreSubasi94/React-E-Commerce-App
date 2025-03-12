import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useBasket } from "../context/BasketContext";
import { FaShoppingBasket } from "react-icons/fa";

function Navbar() {
  const { loggedIn, logout, user } = useAuth();
  const { items } = useBasket();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to={"/"}>eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to={"/product"}>Products</Link>
          </li>
        </ul>
      </div>

      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="blue" className={styles.btn1}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="purple" className={styles.btn1}>
                Register
              </Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button
                  colorScheme="pink"
                  variant="outline"
                  style={{ width: "84px", marginRight: "13px" }}
                >
                  <FaShoppingBasket style={{ marginRight: "4px" }} />
                  {items.length}
                </Button>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="purple" className={styles.btn1}>
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/">
              <Button
                colorScheme="red"
                className={styles.btn1}
                onClick={logout}
              >
                Log Out
              </Button>
            </Link>
            <Link to="/profile">
              <Button colorScheme="pink" className={styles.btn1}>
                Profile
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
