import React from "react";
import { Link } from 'react-router-dom'
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import {
    Button,
    Container,
    Popup,
    Rating,
    Header,
    Image,
    Icon,
    Card
  } from 'semantic-ui-react';
import CreateJob from '../CreateJob';
import Upload from "../../utils/upload";


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
      ratingAvg,
      type,
      hideJobButton
  } = item;



  return (
      
    <div className="profileimg">
      <div className="profilePicContainer">
      <div className="editPic">
        <Popup content='Upload new profile image' trigger={<a>< Upload /></a>} />
        </div>
        <div className="centerprofileimg">
            <Image src={image} alt={description} size='medium' circular />
        </div>
    </div>
    <Container className="card-container">
        <h1>{type}</h1>
        <p>{firstName} {lastName}</p>
        <Rating icon='star' size="ui massive star rating" defaultRating={ratingAvg} maxRating={5} disabled={true}/>
        <h1>{description}</h1>
        <p>{email}</p>
        <p>{address}</p>
        <div>
          {!hideJobButton && <CreateJob />}
          {/* <button class="ui inverted orange button">Post Job</button> */}
        </div>
        
    </Container>
    </div>
  );
}

export default ProfileData;