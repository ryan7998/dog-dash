import React from "react";
import JobList from "../components/JobList";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <JobList />
      <Cart />
    </div>
  );
};

export default Home;
