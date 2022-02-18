import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const AddItemToCart = (item) => {
    setCartItems((prevState) => {
      const inCart = prevState.find((cartItem) => cartItem.id === item.id);

      if (inCart) {
        return prevState.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                amount: cartItem.amount + 1,
              }
            : cartItem
        );
      }

      return [...prevState, { ...item, amount: 1 }];
    });
  };

  const DeleteItemToCart = (itemId) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  return (
    /* El value tengo que pasarlo como objeto pq sino rompe */
    <CartContext.Provider
      value={{ cartItems, AddItemToCart, DeleteItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
