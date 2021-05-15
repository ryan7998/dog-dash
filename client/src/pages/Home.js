import React from "react";
import { Link } from "react-router-dom";
import HomepageBanner from "../components/HompageBanner";
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react';
import JobList from "../components/JobList"

const Home = () => {
  return (
    <>
    <HomepageBanner />
    <JobList status="Live" rowItems="6"/>
    </>
  );
};

export default Home;
