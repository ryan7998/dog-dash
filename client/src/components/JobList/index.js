import React, { useEffect, useState, setState } from "react";
import JobItem from "../JobItem";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { Container, Loader, Dimmer } from "semantic-ui-react";

function JobList(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_JOBS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_JOBS,
        jobs: data.jobs,
      });
      data.jobs.forEach((job) => {
        // idbPromise("jobs", "put", job);
      });
    } else if (!loading) {
      // idbPromise("jobs", "get").then((jobs) => {
      //   dispatch({
      //     type: UPDATE_JOBS,
      //     jobs: jobs,
      //   });
      // });
    }
  }, [data, loading, dispatch]);

  function filterJobs() {
    let result = state.jobs
      .filter((job) => job.status == props.status)
      .reverse();
    return result.sort(state.jobs.date); //Jobs are shown in the ascending order
  }

  return (
    <Container>
      {state.jobs.length ? (
        <div className="ui three column grid job-cards">
          {filterJobs().map((job) => (
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
          ))}
        </div>
      ) : (
        <h3>You haven't added any jobs yet!</h3>
      )}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
      {loading ? <Dimmer active inverted> <Loader inverted content='Loading' /></Dimmer> : null}
    </Container>
  );
}

export default JobList;
