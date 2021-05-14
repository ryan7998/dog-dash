import React from "react";
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
    <div className="card px-1 py-1">
      <Link to={`/jobs/${_id}`}>
        <img
          alt={description}
          src={`/images/${image}`}
        />
        <p>{description}</p>
      </Link>
      <div>
        <div>date: {date}</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default JobItem;
