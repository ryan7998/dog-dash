import React from "react";
import {
    List,
    Rating,
    Image
  } from 'semantic-ui-react';
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from '../../utils/GlobalState';



function RatingItem(item) {
  const {
    firstName,
    lastName,
    text,
    ratingNb,
    image,
    _id,
    
  } = item;

  //updated for redux
  //const [state, dispatch] = useStoreContext();
  
  


  return (
    <>
      
      <List.Item className='ratingItem'>
      <Image avatar src={image?image:'https://dogdash.s3.us-east-2.amazonaws.com/defaultPic.png'} />
      <List.Content>
        <List.Header as='a'>{firstName} {lastName}:</List.Header>
        <List.Description as='a'>(<Rating icon='star' size='small' defaultRating={ratingNb} maxRating={5} disabled={true}/>) {text}</List.Description>
      </List.Content>
    </List.Item>
    </>
  );
}

export default RatingItem;
