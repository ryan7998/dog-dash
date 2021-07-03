import React, { useEffect, useState } from "react";
import HomepageBanner from "../components/HompageBanner";
import { Container, Grid } from "semantic-ui-react";
import JobList from "../components/JobList";
import Auth from "../utils/auth";
import UserList from "../components/UserList";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_TITLE } from "../utils/actions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: UPDATE_TITLE,
      title: 'Home'
    });
  }, []);
  
  const userMe = useQuery(QUERY_USER);

  const state = useSelector((state) => state);
  let {me} = state;
  me =  me ? me[0] : {...userMe?.data?.user};

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
