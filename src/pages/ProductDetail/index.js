import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Text, Button, Stack } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { fetchProduct } from "../../api";
import { useBasket } from "../../context/BasketContext";
function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((item) => item._id === product_id);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (data) {
    const images = data.photos.map((url) => ({ original: url }));
    return (
      <div>
        <Stack spaceX="1" spaceY="3">
          <Button
            colorScheme={findBasketItem ? "red" : "green"}
            style={{ width: "120px" }}
            onClick={() => addToBasket(data, findBasketItem)}
          >
            {findBasketItem ? "Sepetten Çıkar" : "Sepete Ekle"}
          </Button>

          <Text as="h2" fontSize="2xl">
            {data.title}
          </Text>
          <Text>{moment(data.createAt).format("DD/MM/YYYY")}</Text>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              letterSpacing: "1px",
            }}
          >
            {data.description}
          </p>
          <Box m="10">
            <ImageGallery items={images}></ImageGallery>
          </Box>
        </Stack>
      </div>
    );
  }
}

export default ProductDetail;
