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
    _id,
    user_id,
    title,
    description,
    price,
    date,
    status,
    image
  } = item;



let data0= useQuery(QUERY_USER)
const me = data0?.data?.user || {};

let data1 = useQuery(QUERY_USER_BYID, {
    variables: { id: user_id }
});
const submitter = data1?.data?.userById || {};

const [applyJob] = useMutation(APPLY_JOB);
const [withdrawJob] = useMutation(WITHDRAW_JOB);


function updateappliedB() {
  let appliedB = false
  for (var i = 0; i < state.walkerjobs.length; i++) {
        if (state.walkerjobs[i].walker_id== me._id && state.walkerjobs[i].job_id== _id  ) 
            {appliedB=state.walkerjobs[i].apply}
    }
  return appliedB
  }

function walkerjob() {
      let walkerjob = {
        _id:"new"+me._id+_id,
        walker_id: me._id,
        job_id:_id,
        apply:true,
        select:false
      }

    if (updateappliedB() ==true) {
            walkerjob= state.walkerjobs.filter(walkerjob => {
                  return (walkerjob.job_id == _id && walkerjob.walker_id == me._id );
                  }
    )};
return walkerjob
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
            walkerjobs:  [...state.walkerjobs, walkerjob()]
          });
           idbPromise('walkerjobs', 'put', walkerjob());
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
   
          idbPromise('walkerjobs', 'delete', walkerjob()[0] );
          
        } catch (e) {
          console.error(e);
        }
        
};







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
