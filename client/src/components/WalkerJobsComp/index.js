import React, { useEffect } from "react";
import JobItem from "../JobItem";
import { Link } from "react-router-dom";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOB_BYID } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { Card, Icon } from "semantic-ui-react";
import decode from "jwt-decode";

function WalkerJobs(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //getuser id
  const token = localStorage.getItem("id_token");
  const walkerId = decode(token);
  //console.log("decoded : ", decoded.data._id);

  const { loading, data } = useQuery(QUERY_JOB_BYID, {
    variables: { id: walkerId },
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_JOBS,
        jobs: data.jobs,
      });
      // data.jobs.forEach((job) => {
      //   idbPromise('jobs', 'put', job);
      // });
    } else if (!loading) {
      // idbPromise('jobs', 'get').then((jobs) => {
      //   dispatch({
      //     type: UPDATE_JOBS,
      //     jobs: jobs
      //  });
      // });
    }
  }, [data, loading, dispatch]);

  function filterJobs() {
    //console.log(state.jobs);
    return state.jobs.filter((job) => job.appliedUsers.length > 0);
  }

  //It's not executed yet
  function alertFunction(id) {
    alert("Is this is? : " + id);
  }

  return (
    <div>
      <h2 onClick="alertFunction({job._id})"></h2>
      <h2>Our Jobs:</h2>
      {state.jobs.length ? (
        <Card.Group itemsPerRow={3}>
          {filterJobs().map((job) => (
            <Link to={`/singlewalkerjob/${job._id}`}>
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
            </Link>
          ))}
        </Card.Group>
      ) : (
        <h3>You haven't added any jobs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default WalkerJobs;
