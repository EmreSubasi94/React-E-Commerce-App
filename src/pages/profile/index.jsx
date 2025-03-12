import React from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  return (
    <div>
      {user ? (
        <>
          Role: {parsedUser.role}
          <br></br>
          ID: {parsedUser._id}
          <br></br>
          Email: {parsedUser.email}
        </>
      ) : (
        <div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Profili görmek için Giriş yapmalı veya Kayıt olmalısınız.
          </h1>
          <Button
            type="button"
            onClick={() => navigate("/signin")}
            style={{
              display: "flex",
              float: "left",

              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              left: "40%",
              marginTop: "20px",
              padding: "20px",
            }}
          >
            Giriş yap
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              left: "46%",
              marginTop: "20px",
              padding: "20px",
            }}
          >
            Kayıt Ol
          </Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
