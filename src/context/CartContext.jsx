import { createContext, useEffect, useState } from "react";

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState(() => {
    try {
      /* Verificamos si hay productos en el local storage,
      si hay algo lo parseamos porque se guarda como string 
      y si no hay nada devolvemos un array vacio */
      const productosEnLocalStorage = localStorage.getItem("cartProducts");
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  /* Cada vez que se actualize el carrito seteamos el local storage para guardar los productos */
  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  /* Creamos la funcion para agregar productos al carrito */
  const AddItemToCart = (product) => {
    /* Recibimos un producto y nos fijamos si ya esta en el carrito */
    const inCart = cartItems.find((x) => x.id === product.id);

    /* Si el producto se encuentra en el carrito, recorremos el carrito
    y al producto le sumamos uno a la cantidad, sino retornamos el carrito como estaba */
    if (inCart) {
      setCartItems(
        cartItems.map((productsInCart) => {
          if (productsInCart.id === product.id) {
            return { ...inCart, amount: inCart.amount + 1 };
          } else return productsInCart;
        })
      );
      /* Si el producto no se encuentra al carrito, lo agregamos y dejamos en uno la cantidad */
    } else {
      setCartItems([...cartItems, { ...product, amount: 1 }]);
    }
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
