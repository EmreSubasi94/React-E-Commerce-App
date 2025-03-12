import { useState, useContext, createContext, useEffect } from "react";

const BasketContext = createContext();
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];
const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);
  const addToBasket = (data, findBasketItem) => {
    if (findBasketItem) {
      // Eğer item varsa, onu listeden sil.
      const filtered = items.filter((item) => item._id !== findBasketItem._id);
      setItems(filtered);
    } else {
      // Eğer item yoksa, yeni item ekle.
      setItems((items) => [data, ...items]);
    }
  };
  const emptyBasket = () => {
    setItems([]);
  };

  const values = {
    items,
    setItems,
    addToBasket,
    emptyBasket,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};
const useBasket = () => useContext(BasketContext);
export { useBasket, BasketProvider };
