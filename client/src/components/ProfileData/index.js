import React from "react";
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
    <div className="card-container">
        <Card className="profile-card">
        <Image src={`/images/${image}`} wrapped ui={false} alt={description}/>
        <Card.Content>
            <Card.Header>{firstName} {lastName}</Card.Header>
                <Card.Meta>
                    {type} 
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
                {email}
                </Card.Content>

            <Card.Content extra>
            
            {address}
            </Card.Content>
        </Card>
      
    </div>
  );
}

export default ProfileData;
