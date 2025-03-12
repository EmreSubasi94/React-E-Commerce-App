import { useRef, useState } from "react";
import { useBasket } from "../../context/BasketContext";
import {
  Grid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Alert,
} from "@chakra-ui/react";
import Card from "./Card";
import { useDisclosure } from "@chakra-ui/react";
import { postOrder } from "../../api";

function Basket() {
  const [adres, setAdres] = useState("");
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0).toFixed(3);
  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address: adres,
      items: JSON.stringify(itemIds),
    };
    const response = await postOrder(input);
    emptyBasket();
    onClose();
  };
  return (
    <div>
      <div style={{ marginBottom: "35px", fontWeight: "bolder" }}>
        Toplam: {total} TL
        <Button
          onClick={() => {
            if (total > 0) {
              onOpen();
            } else {
              alert("Sepet Boş");
            }
          }}
          ml={4}
          colorScheme="green"
        >
          Sepeti Onayla
        </Button>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Teslimat Adresinizi giriniz</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Adresiniz: </FormLabel>
                <Textarea
                  placeholder="Adres"
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                ></Textarea>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                Gönder
              </Button>
              <Button onClick={onClose}>İptal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <Grid templateColumns="repeat(6, 3fr)" gap={30}>
        {items.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </Grid>
    </div>
  );
}

export default Basket;
