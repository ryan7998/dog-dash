import React, { useEffect } from "react";
//import JobItem from "../JobItem";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_JOBS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"


function JobList() {
  console.log("ok");

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(state);

  const { loading, data } = useQuery(QUERY_JOBS);
  console.log(data);

  /*useEffect(() => {
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
  }, [data, loading, dispatch]);*/



  return (
    <div className="my-2">
      <h2>Our Jobs:</h2>
      {data.jobs.length ? (
        <div className="flex-row">
    
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
