import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import WalkerJobs from "../components/WalkerJobsComp";
//import Cart from "../components/Cart";

import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

function WalkerJobsFunc(){

  return (
    <Container>
      <WalkerJobs type="Dog Walker"/>   
    </Container>
     
  );
};

export default WalkerJobsFunc;
