import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { name, price, quantity, imageUrl } = cartItem;

  const clearItemHandler = (cartItem) => clearItemFromCart(cartItem);
  const addItemHandler = (cartItem) => addItemToCart(cartItem);
  const removeItemHandler = (cartItem) => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemHandler(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemHandler(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItemHandler(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
