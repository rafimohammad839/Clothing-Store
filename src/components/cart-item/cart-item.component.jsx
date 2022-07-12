import React from "react";
import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span>{name}</span>
        <spans>
          {quantity} x ${price}
        </spans>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
