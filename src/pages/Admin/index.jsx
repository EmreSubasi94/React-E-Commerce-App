import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";
import { Link, useResolvedPath } from "react-router-dom";
import styles from "./styles.module.css";
function Admin() {
  const { pathname } = useResolvedPath("");
  const { user } = useAuth();
  return (
    <div>
      {user?.role === "admin" && (
        <div>
          <ul className={styles.ul}>
            <li className={styles.listItem}>
              <Link to={pathname}>
                <Button>Home</Button>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link to={`${pathname}/orders`}>
                <Button>Orders</Button>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link to={`${pathname}/products`}>
                <Button>Products</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {user?.role !== "admin" && (
        <div>
          <h1>Bu sayfayı görüntülemeye yetkiniz bulunmamaktadır.</h1>
          <br></br>
          <Link to={"/profile"}>
            <Button>Profile Dön</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Admin;
