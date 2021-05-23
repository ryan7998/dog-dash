import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER_BYID } from '../utils/queries';
import UserProfileDetails from '../components/UserProfileDetails';


const UserProfile = () =>{
    // get id from url paramater:
    const {id:profileId} = useParams();

    const {loading, data:profileData} = useQuery(QUERY_USER_BYID, { variables: {id: profileId}});

    if(loading){return <div>Loading..</div>}
    return(
        <UserProfileDetails profileData={profileData.userById}/>
    )
}

export default UserProfile;