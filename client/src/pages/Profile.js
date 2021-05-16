import React from "react";
// import { Link } from "react-router-dom";
import ProfilePage from "../components/ProfilePage";
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';
import UserList from "../components/UserList"

const Profile = () => {
  return (
    <Container>
      <ProfilePage />
      <UserList />
    </Container>
  );
};

export default Profile;