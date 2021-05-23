import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { Icon, Button } from "semantic-ui-react";

const CartItem = ({ item }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  return (
    <div className="ui items">
      <div className="item">
        <div className="image">
          <img src={`/images/${item.image}`} alt="" />
        </div>

        <div className="content">
          <div>{item.name}</div>
          <div className="cartprice">${item.price}</div>
          <div className="meta">
            <span>Description</span>
          </div>
          <div className="extra">
            Additional Details
            <div></div>
          </div>
        </div>
      </div>

      <div className="trashicon">
        <span
          role="img"
          aria-label="trash"
          onClick={() => removeFromCart(item)}
        >
          <Icon className="trashicon" name="trash" size="large" color="red" />
        </span>
      </div>
    </div>
  );
};

export default CartItem;
