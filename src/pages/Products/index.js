import React from "react";
import Card from "../../components/Card";
import { Grid, Link, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductList } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductList(),
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error.message;

  return (
    <div>
      {loggedIn && (
        <>
          <Grid templateColumns="repeat(3,1fr)" gap={4}>
            {data.map((item, key) => (
              <Card key={key} item={item} />
            ))}
          </Grid>
        </>
      )}
      {!loggedIn && (
        <>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Ürünleri görmek için Giriş yapmalı veya Kayıt olmalısınız.
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
        </>
      )}
    </div>
  );
}

export default Products;
