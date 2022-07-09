import React, {useContext} from 'react'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom';

import './cart-dropdown.styles.scss'

const CartDropdown = () => {

  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  const navigateToCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div 
      className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />
        })}
      </div>
      <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown