import React, { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from "../../utils/queries"
import { idbPromise } from "../../utils/helpers"
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_CART , ADD_MULTIPLE_TO_CART  } from "../../utils/actions";
import "./style.css";

import {
  Icon,
  Button
} from 'semantic-ui-react';

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const stripePromise = []  /////////////////// to be corrected to use the commented out loadStripe

const Cart = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, users: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price //* item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      //for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      //}
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!state.cartOpen) {
    return (

      <div className="cart-closed" onClick={toggleCart}>
        {/* <span
          role="img"
          aria-label="trash">🛒</span> */}
          <Icon className="carticon" name="shopping cart" size="small" color="teal"/>
      </div>
  //   <ShoppingCartRounded
  //   fontSize="inherit"
  //   style={{ fontSize: "200px", color: 'blue'}}
  // />
    );
  }

  return (
    <div className="cartcontainer">
    <div className="cartinfo">
      <div className="closebtn">
      <Button className="closebtn" color='teal' size='tiny' onClick={toggleCart}>Close</Button>
      </div>
      {/* <Button color='teal' fluid size='large'>+ Create</Button> */}
      <h2>Shopping Cart</h2>
      <div className="cartinfodisplay">
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div>

          <div className="flex-row space-between">
          <div className="cartprice">
            <strong>Total: ${calculateTotal()}</strong>
            </div>
            </div>

            {
              Auth.loggedIn() ?
              <div className="checkoutbtn">
              <Button color='teal' size='large' onClick={submitCheckout}>Checkout</Button>
              </div>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
          </span>
          You haven't added anything to your cart yet!
          </h3>
        )}
    </div>
    </div>
    </div>
    
  );
};

export default Cart;
