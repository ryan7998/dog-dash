import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Icon, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
//import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from "react-redux";
//import { ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  QUERY_USER,
  QUERY_USER_BYID,
  QUERY_WALKERJOBS,
} from "../../utils/queries";
import { APPLY_JOB, WITHDRAW_JOB, UPDATE_JOB, DELETE_JOB } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { UPDATE_WALKERJOBS } from "../../utils/actions";
import { useLazyQuery } from "@apollo/react-hooks";
import UserList from "../UserList";


function JobItem(item) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_WALKERJOBS);

  // Gets from DB and updates the jobwalkers info in the global state and indexed db
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_WALKERJOBS,
        walkerjobs: data.walkerjobs,
      });
      data.walkerjobs.forEach((walkerjob) => {
        idbPromise("walkerjobs", "put", walkerjob);
      });
    } else if (!loading) {
      idbPromise("walkerjobs", "get").then((walkerjobs) => {
        dispatch({
          type: UPDATE_WALKERJOBS,
          walkerjobs: walkerjobs,
        });
      });
    }
  }, [data, loading, dispatch]);

  const {
    submit,
    apply,
    select,
    selectme,
    walker,
    _id,
    user_id,
    title,
    description,
    price,
    date,
    status,
    image,
  } = item;
  
  // All Mutations:
  const [applyJob] = useMutation(APPLY_JOB);
  const [withdrawJob] = useMutation(WITHDRAW_JOB);
  const [updateJob] = useMutation(UPDATE_JOB);
  const [deleteJob] = useMutation(DELETE_JOB);

  // gets the current user details
  let data0 = useQuery(QUERY_USER);
  const me = data0?.data?.user || {};

  //refresh page
  function refresh() {
    window.location.reload(false);
  }

  // gets the job submitter/creator details
  let data1 = useQuery(QUERY_USER_BYID, {
    variables: { id: user_id },
  });
  const submitter = data1?.data?.userById || {};

  // check if the current owner (me) created to the job
  function updatecreatedB() {
    let createdB = false;
    if (me._id == submitter._id) {
      createdB = true;
    }
    return createdB;
  }

  // check if the current walker (me) applied to the job
  function updateappliedB() {
    let appliedB = false;
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (
        state.walkerjobs[i].walker_id == me._id &&
        state.walkerjobs[i].job_id == _id
      ) {
        appliedB = state.walkerjobs[i].apply;
      }
    }
    return appliedB;
  }

  // check if someone applied to the job
  function updateanyappliedB() {
    let appliedB = false;
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (
        state.walkerjobs[i].apply == true &&
        state.walkerjobs[i].job_id == _id
      ) {
        appliedB = true;
      }
    }
    return appliedB;
  }
  // check if there the current user (me) was selected for this job. will be used for filtering and display purposes
  function updateselectedB() {
    let selectedB = false;
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (
        state.walkerjobs[i].select == true &&
        state.walkerjobs[i].job_id == _id &&
        state.walkerjobs[i].walker_id == me._id
      ) {
        selectedB = state.walkerjobs[i].select;
      }
    }
    return selectedB;
  }

// check if there is another user selected for this job . will be used for filtering and display purposes
function updateanyselectedB() {
    let selectedB = false
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (state.walkerjobs[i].select== true && state.walkerjobs[i].job_id== _id   ) 
          {selectedB=state.walkerjobs[i].select}
    }
    return selectedB
    };
    

  // creates the jobwalker element to be added to the global state and the indexed db in case of change (add/withdraw)
  function initialwalkerjob() {
    let walkerjob = {
      _id: "new" + me._id + _id,
      walker_id: me._id,
      job_id: _id,
      apply: false,
      select: false,
    };
    if (updateappliedB() == true) {
      walkerjob = state.walkerjobs.filter((walkerjob) => {
        return walkerjob.job_id == _id && walkerjob.walker_id == me._id;
      });
    }
    return walkerjob;
  }

  function newwalkerjob() {
    return { ...initialwalkerjob(), apply: true };
  }

  const applyForJob = async () => {
    refresh();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await applyJob({
        variables: { job_id: _id },
      });
      dispatch({
        type: UPDATE_WALKERJOBS,
        walkerjobs: [...state.walkerjobs, newwalkerjob()],
      });
      idbPromise("walkerjobs", "put", newwalkerjob());
    } catch (e) {
      console.error(e);
    }
  };

  const withdrawFromJob = async () => {
    refresh();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await withdrawJob({
        variables: { job_id: _id },
      });
      dispatch({
        type: UPDATE_WALKERJOBS,
        walkerjobs: state.walkerjobs.filter((walkerjob) => {
          return walkerjob.job_id !== _id && walkerjob.walker_id !== me._id;
        }),
      });

      idbPromise("walkerjobs", "delete", newwalkerjob()[0]);
    } catch (e) {
      console.error(e);
    }
  };

  // Display the job if it corresponds to the filter criteria coming from react props item
  function filterJob() {
    // Our Jobs Page
    if (
      status === "Live" &&
      submit === "any" &&
      apply === "any" &&
      select === "any" &&
      selectme === "any"
    ) {
      return true;
    }
    // My Job History Page
    if (me.type == "Dog Walker") {
      if (!initialwalkerjob()) {
        // never applied to the job
        if (
          apply == false &&
          (updateanyselectedB().toString() === select ||
            (!updateanyselectedB() && select === false)) &&
          selectme == false
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // applied to the job
        let mywalkerjob = initialwalkerjob();
        if (initialwalkerjob()[0]) {
          mywalkerjob = initialwalkerjob()[0];
        }
        if (
          mywalkerjob.apply.toString() == apply &&
          (updateanyselectedB().toString() == select ||
            (!updateanyselectedB() && select == false)) &&
          mywalkerjob.select.toString() == selectme
        ) {
          return true;
        } else {
          return false;
        }
      }
    } // Dog Owner
    else {
      if (
        updatecreatedB().toString() == submit &&
        (updateanyappliedB().toString() == apply ||
          (!updateanyappliedB() && apply == false)) &&
        (updateanyselectedB().toString() == select ||
          (!updateanyselectedB() && select == false))
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (!filterJob()) {
    return null;
  }

// When Owner presses Complete Job the status updates to 'Done'
  const completeJob = async() =>{
    try {
      const getVal = await updateJob({
        variables: { job_id: _id, newStatus: 'Done' },
      });

      dispatch({

      });

    } catch (e) {
      console.error(e);
    }
  }
  // When Owner clicks Delete Job:
  const deleteJobById = async() =>{
    // await console.log('delete pressed', _id);
    try{
      const deletedJob = await deleteJob({
        variables:{job_id: _id}
      });
      console.log(deletedJob);
      return deletedJob;
    }catch(e){
      return e;
    }

  }

  return (
    <>
      <Card>
        <Card.Content>
          <Image
            src= {submitter.image ? submitter.image : "https://placedog.net/500"}
          />
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{`by ${submitter?.firstName}  ${submitter?.lastName}`}</Card.Meta>
          <Card.Description>{description}</Card.Description>
          <Card.Meta>{date}</Card.Meta>
        </Card.Content>
        
        {Auth.loggedIn() && me.type=="Dog Walker" && (
          <Card.Content extra>
            <div className='ui buttons'>{
              (updateappliedB()== true  && updateanyselectedB()==false && (
                <Button color='red' onClick={withdrawFromJob}>
                  Withdraw
                </Button>
                // <button onClick={withdrawFromJob}>Withdraw</button>
              )) || (
                updateappliedB()== false  && updateanyselectedB()==false && (
                  <Button color='green' onClick={applyForJob}>
                    Apply
                  </Button>
                )
              ) || (
                updateselectedB()==true && (
                  <Button basic color='green' disabled>
                    You are selected!!
                  </Button>
                )) ||(
                  updateanyselectedB()==true && updateselectedB()==false && (
                  <Button basic color='green' disabled>
                    Walker selected!!
                  </Button>
                )
              )
            }
            </div>
          </Card.Content>
        )}
        {Auth.loggedIn() && me.type == "Dog Owner" && walker == "true" && (
          <Card.Content extra>
            <UserList
              type="Dog Walker"
              apply="true"
              job_id={_id}
              job_price={price}
            />
            <Button color="orange" onClick={completeJob}>Job Completed</Button>
            <Button color="red" onClick={deleteJobById}>Delete Job</Button>
          </Card.Content>
        )}
      </Card>
 
      {/* { (Auth.loggedIn() && me.type=="Dog Walker" && updateappliedB()== true  && updateanyselectedB()==false) ? 
          (<button onClick={withdrawFromJob}>Withdraw</button>):null
      }
      { (Auth.loggedIn() && me.type=="Dog Walker" && updateappliedB()== false  && updateanyselectedB()==false) ? 
        (<button onClick={applyForJob}>Apply</button>):null
      }
      { (Auth.loggedIn() && me.type=="Dog Walker" && updateselectedB()==true) ? 
        (<button>You were selected</button>):null
      }
      { (Auth.loggedIn() && me.type=="Dog Walker" && updateanyselectedB()==true && updateselectedB()==false) ? 
        (<button>Walker selected</button>):null
      }

      {Auth.loggedIn() && me.type == "Dog Owner" && walker == "true" ? (
        <UserList
          type="Dog Walker"
          apply="true"
          job_id={_id}
          job_price={price}
        />
        ) : null
      } */}
    </>
  );
}
export default JobItem;