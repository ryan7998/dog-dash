import React, { useEffect } from "react";
import { useState } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from 'react-redux'
//import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_USER_BYID , QUERY_WALKERJOBS} from '../../utils/queries';
import { APPLY_JOB, WITHDRAW_JOB } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { UPDATE_WALKERJOBS } from "../../utils/actions";
import { useLazyQuery } from '@apollo/react-hooks';


function JobItem(item) {
  
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const { loading, data } = useQuery(QUERY_WALKERJOBS);

// Gets from DB and updates the jobwalkers info in the global state and indexed db
  useEffect(() => {
    if(data) {
      dispatch({
          type: UPDATE_WALKERJOBS,
          walkerjobs: data.walkerjobs
        });
        data.walkerjobs.forEach((walkerjob) => {
         idbPromise('walkerjobs', 'put', walkerjob);
         });
    } else if (!loading) {
       idbPromise('walkerjobs', 'get').then((walkerjobs) => {
         dispatch({
           type: UPDATE_WALKERJOBS,
           walkerjobs: walkerjobs
        });
       });
    }
  }, [data, loading, dispatch]);


  const {
    apply,
    select,
    selectme,
    _id,
    user_id,
    title,
    description,
    price,
    date,
    status,
    image
  } = item;

const [applyJob] = useMutation(APPLY_JOB);
const [withdrawJob] = useMutation(WITHDRAW_JOB);

// gets the current user details
let data0= useQuery(QUERY_USER)
const me = data0?.data?.user || {};

// gets the job submitter/creator details
let data1 = useQuery(QUERY_USER_BYID, {
    variables: { id: user_id }
});
const submitter = data1?.data?.userById || {};

// check if the current user (me) applied to the job
function updateappliedB() {
  let appliedB = false
  for (var i = 0; i < state.walkerjobs.length; i++) {
        if (state.walkerjobs[i].walker_id== me._id && state.walkerjobs[i].job_id== _id  ) 
            {appliedB=state.walkerjobs[i].apply}
    }
  return appliedB
  }

// check if there is another user selected for this job. will be used for filtering and display purposes
function updateselectedB() {
    let selectedB = false
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (state.walkerjobs[i].select== true && state.walkerjobs[i].job_id== _id  ) 
          {selectedB=state.walkerjobs[i].select}
    }
    return selectedB
    }

// creates the jobwalker element to be added to the global state and the indexed db in case of change (add/withdraw)
function initialwalkerjob() {
      let walkerjob = {
        _id:"new"+me._id+_id,
        walker_id: me._id,
        job_id:_id,
        apply:false,
        select:false
      }
    if (updateappliedB() ==true) {
            walkerjob= state.walkerjobs.filter(walkerjob => {
                  return (walkerjob.job_id == _id && walkerjob.walker_id == me._id );
                  }
    )};
return walkerjob
}

function newwalkerjob() {
  return {...initialwalkerjob(),apply:true }
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
            type: UPDATE_WALKERJOBS,
            walkerjobs:  [...state.walkerjobs, newwalkerjob()]
          });
           idbPromise('walkerjobs', 'put', newwalkerjob());
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
            type: UPDATE_WALKERJOBS,
            walkerjobs:  state.walkerjobs.filter(walkerjob => {
                            return (walkerjob.job_id !== _id && walkerjob.walker_id !== me._id );
                          })
          });
   
          idbPromise('walkerjobs', 'delete', newwalkerjob()[0] );
        } catch (e) {
          console.error(e);
        }  
};

// Display the job if it corresponds to the filter criteria coming from react props item
function filterJob() {
 if (!initialwalkerjob()) {
  if (apply == false && (updateselectedB().toString()==select || (!updateselectedB() && select == false)) && selectme == false)
   {return true}
  else {return false}
 }

 else {
   let mywalkerjob=initialwalkerjob()
   if (initialwalkerjob()[0]) {mywalkerjob=initialwalkerjob()[0]} 
    console.log(mywalkerjob)
   if ( (mywalkerjob.apply.toString() == apply)
      && (updateselectedB().toString()==select || (!updateselectedB() && select == false))
      && (mywalkerjob.select.toString() == selectme )  )
    {return true}
    else {return false} 
 }
}
if (!filterJob()){return null}


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
 
      { (Auth.loggedIn() && updateappliedB()== true) ? 
          (<button onClick={withdrawFromJob}>Withdraw</button>):null
      }
      { (Auth.loggedIn() && updateappliedB()== false) ? 
        (<button onClick={applyForJob}>Apply</button>):null
      }
    </>
  );
}

export default JobItem;
