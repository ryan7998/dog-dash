import React from "react";
import UserList from "../components/UserList";
import background from "../assets/bgwhite.png";

import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

function Jobs(){
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
    <Container>
      <UserList type="Dog Walker"/>
    </Container>
     </div>
  );
};

export default Jobs;
