import React, { useEffect } from "react";
import JobItem from "../JobItem";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_JOBS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"


function JobList() {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const { loading, data } = useQuery(QUERY_JOBS);

  useEffect(() => {
    if(data) {
      dispatch({
          type: UPDATE_JOBS,
          jobs: data.jobs
        });
        data.jobs.forEach((job) => {
          idbPromise('jobs', 'put', job);
        });
    } else if (!loading) {
      idbPromise('jobs', 'get').then((jobs) => {
        dispatch({
          type: UPDATE_JOBS,
          jobs: jobs
       });
      });
    }
  }, [data, loading, dispatch]);

  function filterJobs() {
    return state.jobs.filter(job => job.status === "Live");
  }


  return (
    <div className="my-2">
      <h2>Our Jobs:</h2>
      {state.jobs.length ? (
        <div className="flex-row">
            {filterJobs().map(job => (
                <JobItem
                  key= {job._id}
                  _id={job._id}
                  image={job.image}
                  description={job.description}
                  price={job.price}
                  date={job.date}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any jobs yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default JobList;
