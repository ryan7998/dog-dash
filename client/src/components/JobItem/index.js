import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
//import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../../utils/queries';
import { APPLY_JOB } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { UPDATE_USERS, APPLY_TO_JOB } from "../../utils/actions";

function JobItem(item) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const {
    _id,
    description,
    price,
    date,
    status,
    image
  } = item;


const { loading, data } = useQuery(QUERY_USER);

const [applyJob] = useMutation(APPLY_JOB);

const applyForJob = async () => {
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await applyJob({
        variables: { job_id:_id}
      });
      /*dispatch({
        type: APPLY_TO_JOB,
        jobs: item
      });
      idbPromise('walkerjobs', 'put', item);*/
        
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className="card px-1 py-1">
      <Link to={`/jobs/${_id}`}>
        <img
          alt={description}
          src={`/images/${image}`}
        />
        <p>{description}</p>
      </Link>
      <div>
        <div>{date}</div>
        <span>${price}</span>
      </div>
      <button onClick={applyForJob}>Apply</button>
    </div>
  );
}

export default JobItem;
