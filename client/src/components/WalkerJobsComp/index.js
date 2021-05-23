import React, { useEffect } from "react";
import JobItem from "../JobItem";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { UPDATE_JOBS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOB_BYID } from "../../utils/queries";

import spinner from "../../assets/spinner.gif";
import { Card } from "semantic-ui-react";
import decode from "jwt-decode";

function WalkerJobs(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const token = localStorage.getItem("id_token");
  const walkerId = decode(token);

  const { loading, data } = useQuery(QUERY_JOB_BYID, {
    variables: { id: walkerId },
  });

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
    return state.jobs.filter((job) => job.appliedUsers.length > 0);
  }

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
