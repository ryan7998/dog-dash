import React from "react";
import JobList from "../components/JobList";
import UserList from "../components/UserList";

import { Button, Container, Grid, Header, Icon } from "semantic-ui-react";

function OurJobs() {
  return (
    <Container>
        <Grid stackable>
            <Grid.Row>
                <Grid.Column width={12}>
                    <h2>Our Jobs:</h2>
                    <JobList status="Live" submit="any" apply= "any" select="any" selectme="any" walker="false"/>
                </Grid.Column>

                <Grid.Column width={4}>
                    <h2>Our Walkers:</h2>
                    <UserList type="Dog Walker" apply="any" job_id="any"/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
  );
}

export default OurJobs;