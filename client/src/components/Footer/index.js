import React from "react";
import {
  Container,
  Grid,
  Header,
  List,
  Image,
  Icon,
  Segment,
} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: "2em 0em", margin:'40px 0' }}>
      <Container>
        <List style={{ margin: "0em 2em" }} horizontal>
          <List.Item>
            <h3>Created by:</h3>
          </List.Item>
          </List><List horizontal>
          <List.Item>
            <a
              href="mailto:malekbenjemia@gmail.com"
              style={{ color: "inherit" }}
            >
              <Icon name="mail" size="large" />
              Malek Ben Jemia
            </a>
          </List.Item>
          <List.Item>
            <a href="mailto:ryan7998@gmail.com" style={{ color: "inherit" }}>
              <Icon name="mail" size="large" />
              Fazle Ryan Chowdhury
            </a>
          </List.Item>
          <List.Item>
            <a href="mailto:cj1988333@hotmail.com" style={{ color: "inherit" }}>
              <Icon name="mail" size="large" />
              Curtis Smith
            </a>
          </List.Item>
          <List.Item>
            <a href="mailto:mguneratne3@gmail.com" style={{ color: "inherit" }}>
              <Icon name="mail" size="large" />
              Manjula Guneratne
            </a>
          </List.Item>
          <List.Item>
            <a
              href="mailto:j.taylor1343@gmail.com"
              style={{ color: "inherit" }}
            >
              <Icon name="mail" size="large" />
              Johann Taylor
            </a>
          </List.Item>
          <List.Item>
            <a
              href="mailto:neeko_tvxq@hotmail.com"
              style={{ color: "inherit" }}
            >
              <Icon name="mail" size="large" />
              Neeko Tang
            </a>
          </List.Item>
          <List.Item>
            <a href="mailto:tinaxu84@gmail.com" style={{ color: "inherit" }}>
              <Icon name="mail" size="large" />
              Shanshan Xu
            </a>
          </List.Item>
          <List.Item>
            <a
              href="mailto:rajendra.dhanraj@gmail.com"
              style={{ color: "inherit" }}
            >
              <Icon name="mail" size="large" />
              Rajendra Dhanray
            </a>
          </List.Item>
          <List.Item>
            <a
              href="mailto:sungjoon.lim@gmail.com"
              style={{ color: "inherit" }}
            >
              <Icon name="mail" size="large" />
              Richard Lim
            </a>
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export default Footer;
