import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import WalkerJobs from "../components/WalkerJobsComp";
import JobHistory from "../components/JobHistory";
//import Cart from "../components/Cart";

import { Button, Container, Header, Icon } from "semantic-ui-react";

function WalkerJobsFunc() {
  return (
    <Container>
      <br />
      <table>
        <tr>
          <td>
            <WalkerJobs status="Live" />
          </td>
          <td>
            <JobHistory status="Inactive"/>
          </td>
        </tr>
      </table>
    </Container>
  );
}

export default WalkerJobsFunc;
