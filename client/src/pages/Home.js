import React from "react";
import { Link } from "react-router-dom";
import HomepageBanner from "../components/HompageBanner";
import { Button, Container, Header, Icon, Grid } from "semantic-ui-react";
import JobList from "../components/JobList";
import Auth from "../utils/auth";
import UserList from "../components/UserList";
const Home = () => {
  if (Auth.loggedIn()) {
    return (
      <Container className="ourjobcontainer">
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={13}>
                      <h2 style={{ fontSize: "3vw" }}>Live Jobs:</h2>
                      
              <JobList
                status="Live"
                submit="any"
                apply="any"
                select="any"
                selectme="any"
                walker="false"
                itemsPerRow={3}
              />
            </Grid.Column>

            <Grid.Column width={3}>
                      <h2 style={{ fontSize: "3vw" }}>Top Walkers:</h2>
              {/* <div className="walkercard"> */}
                      
              <UserList type="Dog Walker" apply="any" job_id="any" />
              {/* </div> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  } else {
    return <HomepageBanner />;
  }
};
export default Home;
