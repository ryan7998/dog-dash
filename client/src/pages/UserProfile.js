import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER_BYID } from '../utils/queries';
import UserProfileDetails from '../components/UserProfileDetails';


const UserProfile = () =>{
    // get id from url paramater:
    const {id:profileId} = useParams();

    // get user profile info:
    const {loading, data:profileData} = useQuery(QUERY_USER_BYID, { variables: {id: profileId}});

    if(loading){return <div>Loading..</div>}
    // const profData = profileData?.firstName;
    
    // console.log(profileData)

    return(
        <UserProfileDetails profileData={profileData.userById}/>

        // <div>User Profile Page: </div>
    )
}

export default UserProfile;