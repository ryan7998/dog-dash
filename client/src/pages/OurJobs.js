import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import JobList from "../components/JobList";
import UserList from "../components/UserList";
//import Cart from "../components/Cart";

import { Button, Container, Header, Icon } from "semantic-ui-react";

function OurJobs() {
  return (
    <div className="jobpagecss">
      <div>
        <h2>Our Jobs:</h2>
        <JobList status="Live" />
      </div>

      <div>
        <h2>Our Walkers:</h2>
        <UserList type="Dog Walker" apply="any" job_id="any" />
      </div>
    </div>
  );
}

export default OurJobs;