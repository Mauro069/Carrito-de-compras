import "./App.scss";
import React from "react";
import Home from "./components/Home";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
};

export default App;
