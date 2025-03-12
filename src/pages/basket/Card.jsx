import React from "react";
import { Box, Image, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaTurkishLiraSign } from "react-icons/fa6";
import "../../App.css";
import { useBasket } from "../../context/BasketContext";
import styles from "./styles.module.css";

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (basketItem) => basketItem._id === item._id
  );

  const handleAddToBasket = () => {
    addToBasket(item, findBasketItem);
  };

  return (
    <div>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="0"
        maxHeight={"400px"}
      >
        <Link to={`/product/${item._id}`} maxHeight={"176px"}>
          <Box
            mt="0"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            height={"70px"}
          >
            {item.title}
          </Box>
          <Box className={styles.imageContent}>
            <Image
              className={styles.Images}
              src={item.photos[0]}
              alt="product"
              loading="lazy"
              height={"90px"}
              width={"166px"}
              style={{ marginTop: "55px", marginBottom: "40px" }}
            ></Image>
          </Box>
          <Box p="6">
            <Box className={styles.basketprice}>
              <Text as="span" fontWeight="semibold">
                {item.price} TL
              </Text>
            </Box>
          </Box>
        </Link>
        <Button
          className={styles.basketButton}
          colorScheme={findBasketItem ? "red" : "green"}
          onClick={handleAddToBasket}
          style={{ marginLeft: "30px" }}
        >
          {findBasketItem ? "Sepetten Çıkar" : "Sepete Ekle"}
        </Button>
      </Box>
    </div>
  );
}

export default Card;
