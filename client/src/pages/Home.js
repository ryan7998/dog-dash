import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Header,
  Icon,
  
} from 'semantic-ui-react'

const Home = () => {
  return (
    <Container text>
      <Header
        as='h1'
        content='Dog Dash'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Do whatever you want when you want to.'
        style={{
          fontWeight: 'normal',
        }}
      />
              <Link to="/login">
      <Button color='teal' size='huge'>
        Register
        <Icon name='right arrow' />
      </Button>
      </Link>
    </Container>
  );
};

export default Home;
