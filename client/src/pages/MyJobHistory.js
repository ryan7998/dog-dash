import React from "react";
//import { Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
//import { QUERY_USER } from "../utils/queries";
import WalkerJobs from "../components/WalkerJobsComp";
import JobHistory from "../components/JobHistory";
import JobList from "../components/JobList";
import CreateJob from '../components/CreateJob';
//import Cart from "../components/Cart";
import { QUERY_USER } from "../utils/queries";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import background from "../assets/bgwhite.png";

function MyJobHistory() {
  // gets the current user details
  let data0 = useQuery(QUERY_USER);
  const me = data0?.data?.user || {};

  if (me.type == "Dog Walker") {
    return (
      <div className="jobpagecss">
        <div>
          <h2>Active Jobs:</h2>
          <JobList status="Live" submit="any" apply= "true" select="false" selectme="false" walker="false" itemsPerRow = {4}/>
          <JobList status="Live" submit="any" apply= "true" select="true"  selectme="true" walker="false" itemsPerRow = {4}/>
          <JobList status="Live" submit="any" apply= "true" select="true"  selectme="false" walker="false" itemsPerRow = {4}/>
        </div>

        <div>
          <h2>Previous Jobs:</h2>
          <JobList status="Done" submit="any" apply= "true" select="true" selectme="true" walker="false" itemsPerRow = {4}/>
          <JobList status="Done" submit="any" apply= "true" select="true" selectme="false" walker="false"itemsPerRow = {4}/>
        </div>
      </div>
    );
  } else {
    // Dog Owner
    return (
    <>
        <div>
          <h2>Active Jobs:</h2>
          <JobList status="Live" submit="true" apply= "true" select="false" selectme="any" walker="true" itemsPerRow = {4} />
          <JobList status="Live" submit="true" apply= "true" select="true"  selectme="any" walker="true" itemsPerRow = {4}/>
          <JobList status="Live" submit="true" apply= "false" select="false"  selectme="any" walker="true" itemsPerRow = {4}/>
        </div>

        <div>
            <h2>Previous Jobs:</h2>
            <JobList status="Done" submit="true" apply= "true" select="true" selectme="any" walker="true" itemsPerRow = {4}/>
            <JobList status="Done" submit="true" apply= "true" select="false" selectme="any" walker="true"itemsPerRow = {4}/>
            <JobList status="Done" submit="true" apply= "false" select="false" selectme="any" walker="true"itemsPerRow = {4}/>
        </div>
        <CreateJob />
    </>

    );
  }
}

export default MyJobHistory;