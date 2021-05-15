import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import UserList from "../components/WalkerJobs";
//import Cart from "../components/Cart";

import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

function WalkerJobs(){
  return (
    <Container>
      <WalkerJobs type="Dog Walker"/>   
    </Container>
     
  );
};

export default WalkerJobs;
