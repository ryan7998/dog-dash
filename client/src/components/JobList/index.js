import React, { useEffect, useState, setState } from "react";
import JobItem from "../JobItem";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_JOBS } from "../../utils/actions";
import { useMutation, useQuery } from "@apollo/react-hooks";
// import { QUERY_JOBS } from "../../utils/queries";
import { QUERY_JOB_BY_STATUS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { Container, Loader, Dimmer, Item } from "semantic-ui-react";

function JobList() {

  const dispatch = useDispatch();

  const { loading, data:liveJobs } = useQuery(QUERY_JOB_BY_STATUS, {
    variables: { status: 'Live' },
  });
  if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}

  return (
    <Container>
      {liveJobs ? (
        <>
          {liveJobs.jobByStatus.map(job =>(
              <Item.Group relaxed key={job._id}>
                  <JobItem item = {job}/>
              </Item.Group>
          ))}
        </>
      ) : (
        <h3>No Jobs added any jobs yet!</h3>
      )}
      {loading ? <Dimmer active inverted> <Loader inverted content='Loading' /></Dimmer> : null}
    </Container>
  );
}

export default JobList;
