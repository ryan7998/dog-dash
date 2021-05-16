import React from "react";
import ProfilePage from "../components/ProfilePage";
import background from "../assets/bgwhite.png";

import {
  Button,
  Container,
  Header,
  Icon,
  Card
} from 'semantic-ui-react'

function Profile(){
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
    <Container className="profile-page">
      <ProfilePage type="Dog Walker"/>
    </Container>
     </div>
  );
};

export default Profile;


