import { createContext, useState } from "react";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito, que sera un array vacio que luego tendra objetos */
  const [cartItems, setCartItems] = useState([]);

  /* Creamos la funcion para agregar productos al carrito */
  const AddItemToCart = (item) => {
    setCartItems((prevState) => {
      /* Nos fijamos si en el estado anterior se encuentra el producto con su id */
      const inCart = prevState.find((cartItem) => cartItem.id === item.id);

      /* Si esta el producto en el carrito le sumamos 1 al amount (cantidad) sino no hacemos nada */
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

      /* Si el producto no esta en el carrito devolvemos el estado anterior mas el nuevo producto */
      return [...prevState, { ...item, amount: 1 }];
    });
  };

  /* Creamos la funcion para borrar productos del carrito */
  const DeleteItemToCart = (itemId) => {
    /* Filtramos el carrito y devolvemos todos, menos el que tiene la id que le pasamos */
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{ cartItems, AddItemToCart, DeleteItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
