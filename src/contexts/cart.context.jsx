import { createContext, useEffect, useState } from "react";

// Adding item to cart
const addCartItem = (cartItems, productToAdd) => {
  // Find if the cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  // If found, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  // Return new array with modified quantity/new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Removing one item per click from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item
  const currentItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If the quantity is 1, then remove the item
  if (currentItem.quantity <= 1) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== cartItemToRemove.id;
    });
  }
  // Return back cart items with matching cart item with reduced quantity
  const newCartItems = cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
  return newCartItems;
};

// Clearing the item as a whole from cart
const clearCartItem = (cartItems, cartItemToClear) => {
  const newCartItems = cartItems.filter((cartItem) => {
    return cartItem.id !== cartItemToClear.id;
  });
  return newCartItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  productsCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  setTotal: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newProductsCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setProductsCount(newProductsCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    setTotal(newTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    productsCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
