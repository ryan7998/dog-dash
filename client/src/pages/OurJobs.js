import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import JobList from "../components/JobList";
import UserList from "../components/UserList";
//import Cart from "../components/Cart";

import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'

function OurJobs(){
  return (
    <Container>
      <br />
      <table>
        <tr>
          <td>
          <h2>Our Jobs:</h2>
          <JobList status="Live" submit="any" apply= "any" select="any" selectme="any" walker="false"/>
          </td>

          <td>
          <h2>Our Walkers:</h2>
          <UserList type="Dog Walker" apply="any" job_id="any"/>
          </td>
        </tr>
      </table>
    </Container>
     
  );
};

export default OurJobs;
