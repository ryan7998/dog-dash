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
    title,
    description,
    price,
    date,
    status,
    image
  } = item;

let data= useQuery(QUERY_USER)
const me = data?.user || {};

data = useQuery(QUERY_USER_BYID, {
    variables: { id: user_id }
});
const submitter = data?.userById || {};


const [applyJob] = useMutation(APPLY_JOB);
const [withdrawJob] = useMutation(WITHDRAW_JOB);

const walkerjobitem ={
  walker_id: me._id,
  _id: _id,
  apply:1,
  select:0
}

const applyForJob = async () => {
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;
   
        if (!token) {
          return false;
        }
        try {
          await applyJob({
            variables: { job_id:_id}
          });
          dispatch({
            type: APPLY_TO_JOB,
            job: item
          });
          idbPromise('walkerjobs', 'put', walkerjobitem);
            
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
          dispatch({
            type: WITHDRAW_FROM_JOB,
            job: item
          });
          idbPromise('walkerjobs', 'pull', walkerjobitem);
            
        } catch (e) {
          console.error(e);
        }
    
};

console.log(state.appliedjobs, item)

  return (
    <>
      <Card
        image={image ? image : 'https://placedog.net/500'}
        header={title}
        meta={`${submitter?.firstName}  ${submitter?.lastName}`}
        description={description}
        // description={`Wage: $ ${price}`}
        // extra={`$ ${price}`}     
      />
 
      { (Auth.loggedIn() && state.appliedjobs.includes(item)) ? 
          (<button onClick={withdrawFromJob}>Withdraw</button>):null
      }
      { (Auth.loggedIn() && !state.appliedjobs.includes(item)) ? 
        (<button onClick={applyForJob}>Apply</button>):null
      }
    </>
  );
}

export default JobItem;
