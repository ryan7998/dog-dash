import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
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
          // fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          // marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary size='huge'>
        Register
        <Icon name='right arrow' />
      </Button>
    </Container>
  );
};

export default Home;
