import React from 'react';
import { connect } from 'react-redux';

import {clearItemFromCart} from '../../redux/cart/cart.actions'

import './cart-item.styles.scss';

const CartItem = ({ item , clearItem}) =>{ 
  const { imageUrl, price, name, quantity } = item;
  return(
  <div className='cart-item'>
    <img src={imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
      
      <div className='remove-button' onClick={()=>clearItem(item)}>&#10005;</div>
    </div>
  </div>
)};


const mapDispatchToProps=dispatch=>({
  clearItem : (cartItem)=>dispatch(clearItemFromCart(cartItem)) , 
});


export default connect(null , mapDispatchToProps)(CartItem);
