import React from "react";
import { Link, useParams } from 'react-router-dom'
import Auth from "../../utils/auth";

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
  const userID = Auth.getProfile().data._id;
  if (item._id === userID) {
    console.log("a");
     } else {
      item = {...item, image: "." + item.image};
      
     }

 // item = {...item, image: "hello" + item.image};
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
 
 const urlID = useParams().id;
 
 console.log(image);

  return (
      
    <div className="profileimg">
      <div className="profilePicContainer">
        <div className="centerprofileimg">
          <Image src={image} alt={description} size='medium' circular />
        </div>
        {/*conditionaly render the image upload only if it is the USERS own page profile */}
        {_id === userID &&
        <div className="editPic"><Popup content='Upload new profile image' trigger={<a>< Upload /></a>} /></div>
        }
    </div>
    <Container className="card-container">
        {/* <img
          alt={description}
          src={`/images/${image}`}
        /> */}
        <h1>{type}</h1>
        <p>{firstName} {lastName}</p>
        <Rating icon='star' defaultRating={ratingAvg} maxRating={5} disabled={true}/>
        <p>{description}</p>
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