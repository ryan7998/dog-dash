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
import { Button, Container, Grid, Header, Icon } from "semantic-ui-react";
import background from "../assets/bgwhite.png";

function MyJobHistory() {
  // gets the current user details
  let data0 = useQuery(QUERY_USER);
  const me = data0?.data?.user || {};

  if (me.type == "Dog Walker") {
    return (

      <Container>
      <Grid stackable>
          <Grid.Row>
              <Grid.Column width={16}>
                  <div className="actjobtitle">
                  <h2>Active Jobs:</h2>
                  <JobList status="Live" submit="any" apply= "true" select="false" selectme="false" walker="false" itemsPerRow = {4}/>
                  <JobList status="Live" submit="any" apply= "true" select="true"  selectme="true" walker="false" itemsPerRow = {4}/>
                  <JobList status="Live" submit="any" apply= "true" select="true"  selectme="false" walker="false" itemsPerRow = {4}/>
                  </div>
              </Grid.Column>

              <Grid.Column width={16}>
              <div className="prejobtitle">
                  <h2>Previous Jobs:</h2>
                  <JobList status="Done" submit="any" apply= "true" select="true" selectme="true" walker="false" itemsPerRow = {4}/>
                  <JobList status="Done" submit="any" apply= "true" select="true" selectme="false" walker="false"itemsPerRow = {4}/>
                  </div>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    </Container>
    );
  } else {
    // Dog Owner
    return (

   <Container>
      <Grid stackable>
          <Grid.Row>
              <Grid.Column width={16}>
                <div className="postjobbtn">
              <CreateJob />
              </div>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>
              <Grid.Column width={16}>
                  <h2>Active Jobs:</h2>
                  <JobList status="Live" submit="true" apply= "true" select="false" selectme="any" walker="true" itemsPerRow = {4} />
                  <JobList status="Live" submit="true" apply= "true" select="true"  selectme="any" walker="true" itemsPerRow = {4}/>
                  <JobList status="Live" submit="true" apply= "false" select="false"  selectme="any" walker="true" itemsPerRow = {4}/>
              </Grid.Column>

              <Grid.Column width={16}>
                  <div className="prejobtitle">
                  <h2>Previous Jobs:</h2>
                     <JobList status="Done" submit="true" apply= "true" select="true" selectme="any" walker="true" itemsPerRow = {4}/>
                    <JobList status="Done" submit="true" apply= "true" select="false" selectme="any" walker="true"itemsPerRow = {4}/>
                    <JobList status="Done" submit="true" apply= "false" select="false" selectme="any" walker="true"itemsPerRow = {4}/>
                </div>
              </Grid.Column>
          </Grid.Row>
      </Grid>  
    </Container>

    );
  }
}

export default MyJobHistory;