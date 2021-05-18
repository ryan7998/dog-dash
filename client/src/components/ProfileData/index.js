import React from "react";
import { Link } from 'react-router-dom'
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Container,
    Header,
    Image,
    Icon,
    Card
  } from 'semantic-ui-react'

function ProfileData(item) {
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
      
    <div className="profileimg">
      <div className="centerprofileimg">
    <Image src='images/walker.jpeg' alt={description} size='medium' circular />
    </div>
    <Container className="card-container">
        {/* <img
          alt={description}
          src={`/images/${image}`}
        /> */}
        <h1>{type}</h1>
        <p>{firstName} {lastName}</p>
        <p>{description}</p>
        <p>{email}</p>
        <p>{address}</p>
        <div>
        <button class="ui inverted orange button">Post Job</button>
        </div>
    </Container>
    </div>
  );
}

export default ProfileData;