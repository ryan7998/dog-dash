import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import JobList from "../components/JobList";
import UserList from "../components/UserList";
//import Cart from "../components/Cart";
import background from "../assets/bgwhite.png";
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';
import CreateJob from '../components/CreateJob';


function OurJobs(){
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
    <div className="jobcardcss">
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
      <CreateJob />
    </Container>
    </div>
    </div>
  );
};

export default OurJobs;
