import React, { useEffect } from "react";
import { Card, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
//import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_USER_BYID } from '../../utils/queries';
import { APPLY_JOB, WITHDRAW_JOB } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { UPDATE_USERS, APPLY_TO_JOB, WITHDRAW_FROM_JOB } from "../../utils/actions";
import { useLazyQuery } from '@apollo/react-hooks';

function JobItem(item) {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  // console.log(item.jobs);

  const {
    _id,
    user_id,
    description,
    price,
    date,
    status,
    image,
    user,
    title
  } = item;

  console.log(image)


const [applyJob] = useMutation(APPLY_JOB);
const [withdrawJob] = useMutation(WITHDRAW_JOB);

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

const withdrawFromJob = async () => {
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await withdrawJob({
        variables: { job_id:_id}
      });
      /*dispatch({
        type: WITHDRAW_FROM_JOB,
        jobs: item
      });
      idbPromise('walkerjobs', 'pull', item);*/
        
    } catch (e) {
      console.error(e);
    }
};

  
  // console.log(item);

  return (
    <>
      <Card
        image={image ? image : 'https://placedog.net/500'}
        header={title}
        meta={`${user[0]?.firstName}  ${user[0]?.lastName}`}
        description={description}
        // description={`Wage: $ ${price}`}
        // extra={`$ ${price}`}
      />
      {/* <button onClick={applyForJob}>Apply</button> */}
      {/* <button onClick={applyForJob}>Apply</button>
      <button onClick={withdrawFromJob}>Withdraw</button> */}
    </>
  );
}

export default JobItem;
