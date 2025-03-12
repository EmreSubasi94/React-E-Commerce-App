import React from "react";
import { Box, Image, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
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
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="0">
        <Link to={`/product/${item._id}`}>
          <Box fontWeight="semibold" as="h4" lineHeight="tight" mb={3}>
            {item.title}
          </Box>
          <Box className={styles.imageContent}>
            <Image
              className={styles.imageContent}
              src={item.photos[0]}
              alt="product"
              loading="lazy"
            ></Image>
          </Box>
          <Box p="0">
            <Box display="flex" alignItems="baseline">
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </Box>

            <Box>
              <Text
                as="span"
                fontWeight="semibold"
                className={styles.itemPrice}
              >
                {item.price} TL
              </Text>
            </Box>
          </Box>
        </Link>
        <Button
          className={styles.basketButton}
          colorScheme={findBasketItem ? "red" : "green"}
          onClick={handleAddToBasket}
        >
          {findBasketItem ? "Sepetten Çıkar" : "Sepete Ekle"}
        </Button>
      </Box>
    </div>
  );
}

export default Card;
