import React from "react";
import { Link } from "react-router-dom";
import { QUERY_USER_BYID } from '../../utils/queries';
import { useSelector, useDispatch} from 'react-redux'
import {
    Button,
    Container,
    Header,
    Icon,
    Image
} from 'semantic-ui-react';
import background from "../assets/bgwhite.png";
import { useQuery } from "@apollo/react-hooks";
import Auth from '../../utils/auth';

const ProfilePage = () =>{
    const { firstname: userParam} = useParams();

    const { loading, data } = useQuery(QUERY_USER_BYID, {
        variables: { firstname: userParam }
    });

    const user = data?.user || {};

    // if (
    //     Auth.loggedIn() &&
    //     Auth.getProfile().data.firstname === userParam
    //   ) {
    //     return <Redirect to="/profile" />;
    //   }
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.firstname) {
        return (
          <h4>
            You need to be logged in to see this. Use the navigation links above to sign up or log in!
          </h4>
        );
      }    

    return(
        <div style={{ backgroundImage: `url(${background})` }}>
            {/* <Container text>
            </Container> */}
            {user.firstname}
        </div>

    )
}

export default ProfilePage;


