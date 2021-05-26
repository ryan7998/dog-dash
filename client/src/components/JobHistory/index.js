import React, { useEffect } from "react";
import JobItem from "../JobItem";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_JOBS, UPDATE_TITLE } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

function JobHistory(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_JOBS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_JOBS,
        jobs: data.jobs,
      });
    } else if (!loading) {
    }
  }, [data, loading, dispatch]);

  function filterJobs() {
    return state.jobs.filter((job) => job.status === props.status);
  }

  return (
    <div>
      <h2></h2>
      <h2>Jobs History</h2>
      {state.jobs.length ? (
        <div className="ui two column grid">
          {filterJobs().map((job) => (
            <JobItem
              key={job._id}
              _id={job._id}
              user_id={job.user_id}
              title={job.title}
              description={job.description}
              price={job.price}
              date={job.date}
              status={job.status}
              image={job.image}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any jobs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default JobHistory;
