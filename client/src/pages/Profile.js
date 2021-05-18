import React from "react";
import ProfilePage from "../components/ProfilePage";
import background from "../assets/bgwhite.png";
import JobHistory from "../components/JobHistory";

import {
  Button,
  Container,
  Header,
  Icon,
  Card
} from 'semantic-ui-react'

function Profile(){
  return (
    <div>
    <div className="profile-page">
      <ProfilePage type="Dog Walker"/>
    </div>
     </div>
  );
};

export default Profile;


