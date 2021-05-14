import React from "react";
//import { Link } from "react-router-dom";

//import { useQuery } from '@apollo/react-hooks';
//import { QUERY_USER } from "../utils/queries";
import JobList from "../components/JobList";
import UserList from "../components/UserList";
//import Cart from "../components/Cart";

function Jobs(){
  return (
    <div className="container">

      <JobList status="Live"/>
      <UserList type="walker"/>

    </div>
     
  );
};

export default Jobs;
