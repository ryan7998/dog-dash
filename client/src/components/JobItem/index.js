import React from "react";
import { Card, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function JobItem(item) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const {
    image,
    description,
    _id,
    price,
    date
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      
      dispatch({
        type: ADD_TO_CART,
        job: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    
  }
}

  return (
    <Card
      image='https://placedog.net/500'
      header='Elliot Baker'
      meta='Friend'
      description={description}
      extra={price}
    />

  );
}

export default JobItem;
