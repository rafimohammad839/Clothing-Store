import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  productsCount: 0,
  total: 0,
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, productsCount, total, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newProductsCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      productsCount: newProductsCount,
      total: newTotal,
    }));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartItems,
    productsCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
