import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // Find if the cartItems contains productToAdd
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  // If found, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    })
  }

  // Return new array with modified quantity/new cart item

  return [...cartItems, { ...productToAdd, quantity: 1 }];
  
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => { },
  productsCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    const newProductsCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setProductsCount(newProductsCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, productsCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
