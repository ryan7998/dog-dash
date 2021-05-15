import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'


function UserItem(item) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const {
      _id,
      firstName,
      lastName,
      description,
      address,
      email,
      image,
      type
  } = item;


  return (
    <div className="card px-1 py-1">
      <Link to={`/users/${_id}`}>
        <img
          alt={description}
          src={`/images/${image}`}
        />
        <p>{type}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{description}</p>
        <p>{email}</p>
        <p>{address}</p>
      </Link>
    </div>
  );
}

export default UserItem;
