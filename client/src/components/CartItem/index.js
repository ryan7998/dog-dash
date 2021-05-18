import React from 'react';
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import {
  Icon,
  Button,
} from 'semantic-ui-react';

const CartItem = ({ item }) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };
/*
  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id 
      });//purchaseQuantity: parseInt(value)
      idbPromise('cart', 'put', { ...item}); //, purchaseQuantity: parseInt(value) 

    }
  }
  */

  return (

    <div class="ui items">
  <div class="item">

    <div class="image">
      <img  src={`/images/${item.image}`}
          alt=""
        />
    </div>

    <div class="content">
      <div>
      {item.name} 
      </div>
      <div className="cartprice">
      ${item.price}
      </div>
      <div class="meta">
        <span>Description</span>
      </div>
      <div class="extra">
        Additional Details
        <div>
     </div>
      </div>
  </div>
  </div>

  <div className="trashicon">
    <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            <Icon className="trashicon" name="trash" size="large" color="red"/>
          </span>
    </div>

  </div>
  
  );
}

export default CartItem;