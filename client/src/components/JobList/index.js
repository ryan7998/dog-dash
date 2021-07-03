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

function JobList(props) {
  const state = useSelector((state) => state);
  const {me} = state;
  // console.log(state);
  const dispatch = useDispatch();

  const { loading, data:liveJobs } = useQuery(QUERY_JOB_BY_STATUS, {
    variables: { status: 'Live' },
});
  // console.log(liveJobs);
  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_JOBS,
  //       jobs: data.jobs,
  //     });
  //     data.jobs.forEach((job) => {
  //       // idbPromise("jobs", "put", job);
  //     });
  //   } else if (!loading) {
  //     // idbPromise("jobs", "get").then((jobs) => {
  //     //   dispatch({
  //     //     type: UPDATE_JOBS,
  //     //     jobs: jobs,
  //     //   });
  //     // });
  //   }
  // }, [data, loading, dispatch]);

  // function filterJobs() {
  //   let result = state.jobs
  //     .filter((job) => job.status == props.status)
  //     .reverse();
  //   return result.sort(state.jobs.date); //Jobs are shown in the ascending order
  // }
  if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}

  return (
    <Container>
      {liveJobs ? (
        <>
          {liveJobs.jobByStatus.map(job =>(
              <Item.Group relaxed key={job._id}>
                  <JobItem item = {job} />
              </Item.Group>
          ))}
          {/* {filterJobs().map((job) => (
            <JobItem
              apply={props.apply}
              submit={props.submit}
              select={props.select}
              selectme={props.selectme}
              walker={props.walker}
              key={job._id}
              _id={job._id}
              user_id={job.user_id}
              title={job.title}
              description={job.description}
              price={job.price}
              date={job.date}
              status={job.status}
            />
          ))} */}
        </>
      ) : (
        <h3>You haven't added any jobs yet!</h3>
      )}
      {loading ? <Dimmer active inverted> <Loader inverted content='Loading' /></Dimmer> : null}
    </Container>
  );
}

export default JobList;
