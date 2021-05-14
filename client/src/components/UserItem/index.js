import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'


function UserItem(item) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const {
    image,
    description,
    _id
  } = item;


  return (
    <div className="card px-1 py-1">
      <Link to={`/users/${_id}`}>
        <img
          alt={description}
          src={`/images/${image}`}
        />
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default UserItem;