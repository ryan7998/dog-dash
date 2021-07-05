import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER_BYID } from '../utils/queries';
import RatingList from "../components/RatingList";
import { useDispatch } from "react-redux";
import { Loader, Dimmer} from "semantic-ui-react";
import ProfileData from '../components/ProfileData';


const UserProfile = () =>{
    // get id from url paramater:
    const {id:profileId} = useParams();
    const {loading, data:profileData} = useQuery(QUERY_USER_BYID, { variables: {id: profileId}});

    // if loading return loading:
    if(loading){return <Dimmer active><Loader content='Loading' /></Dimmer>}

    // console.log(profileData);
    return(
      <>
        <ProfileData profileData={profileData.userById}/>
        <RatingList _id={profileData.userById.id}/>
      </>
    )
}

export default UserProfile;