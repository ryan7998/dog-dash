import React, { useEffect, useState } from "react";
import HomepageBanner from "../components/HompageBanner";
import { Container, Grid, Dimmer, Loader } from "semantic-ui-react";
import JobList from "../components/JobList";
import Auth from "../utils/auth";
import UserList from "../components/UserList";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_TITLE, UPDATE_ME } from "../utils/actions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: UPDATE_TITLE,
      title: 'Home'
    });
  }, []);
  
  //  gets the current user details:
  const {loading, error, data} = useQuery(QUERY_USER);
  if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}
  const me = data?.user || {};

  // update redux state of me:
  dispatch({
    type: UPDATE_ME,
    me: me
  });

  if (Auth.loggedIn()) {
    if(me && me.type === 'Dog Walker'){
      return (
        <Container className="ourjobcontainer">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={16}>
                <h2 style={{ fontSize: "3vw" }}>Live Jobs:</h2>
                <JobList/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }else{
      return (
        <Container className="ourjobcontainer">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column width={16}>
                <h2 style={{ fontSize: "3vw" }}>Live Jobs:</h2>
                {/* <JobList/> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
      
    }
  } else {
    return <HomepageBanner />;
  }
};
export default Home;
