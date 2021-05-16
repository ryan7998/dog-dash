import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import WalkerJobs from "../components/WalkerJobsComp";
import JobHistory from "../components/JobHistory";
import JobList from "../components/JobList";
//import Cart from "../components/Cart";

import { Button, Container, Header, Icon } from "semantic-ui-react";

function MyJobHistory() {
  return (
    <Container>
      <br />
      <table>
        <tr>
          <td>
          <h2>Active Jobs:</h2>
          <JobList status="Live" apply= "true" select="false" selectme="false"/>
          <JobList status="Live" apply= "true" select="true"  selectme="true"/>
          <JobList status="Live" apply= "true" select="true"  selectme="false"/>
          </td>
          <td>
          <h2>Previous Jobs:</h2>
          <JobList status="Done" apply= "true" select="true" selectme="true"/>
          <JobList status="Done" apply= "true" select="true" selectme="false"/>
          </td>
        </tr>
      </table>
    </Container>
  );
}

export default MyJobHistory;
