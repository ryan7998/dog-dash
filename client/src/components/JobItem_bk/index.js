import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Card, Button, Image, Rating } from "semantic-ui-react";

import { UPDATE_JOBS } from "../../utils/actions";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { idbPromise } from "../../utils/helpers";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  QUERY_JOB_BYID,
  QUERY_USER,
  QUERY_USER_BYID,
  QUERY_WALKERJOBS,
} from "../../utils/queries";
import {
  APPLY_JOB,
  WITHDRAW_JOB,
  UPDATE_JOB,
  DELETE_JOB,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { UPDATE_WALKERJOBS } from "../../utils/actions";

import UserList from "../UserList";

function JobItem(item) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  //modal
  const [open, setOpen] = useState(false);

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

  const { loading, data } = useQuery(QUERY_WALKERJOBS);

  // Gets from DB and updates the jobwalkers info in the global state and indexed db
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_WALKERJOBS,
        walkerjobs: data.walkerjobs,
      });
      data.walkerjobs.forEach((walkerjob) => {
        // idbPromise("walkerjobs", "put", walkerjob);
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

  // gets the current user details
  let data0 = useQuery(QUERY_USER);
  const me = data0?.data?.user || {};

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
    let selectedB = false;
    for (var i = 0; i < state.walkerjobs.length; i++) {
      if (
        state.walkerjobs[i].select == true &&
        state.walkerjobs[i].job_id == _id
      ) {
        selectedB = state.walkerjobs[i].select;
      }
    }
    return selectedB;
  }

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

  function initialjob() {
    let job = {
      _id: _id,
      user_id: user_id,
      title: title,
      description: description,
      price: price,
      date: date,
      status: status,
      image: image,
    };

    return job;
  }

  function newjobstatus() {
    return { ...initialjob(), status: "Done" };
  }

  const applyForJob = async () => {
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
    window.location.reload(false);
  };

  const withdrawFromJob = async () => {
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
    window.location.reload(false);
  };

  // Display the job if it corresponds to the filter criteria coming from react props item
  function filterJob() {
    // Our Jobs Page
    if (
      submit == "any" &&
      apply == "any" &&
      select == "any" &&
      selectme == "any"
    ) {
      return true;
    }

    // My Job History Page
    if (me.type == "Dog Walker") {
      if (!initialwalkerjob()) {
        // never applied to the job
        if (
          apply == false &&
          (updateanyselectedB().toString() == select ||
            (!updateanyselectedB() && select == "false")) &&
          selectme == "false"
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
            (!updateanyselectedB() && select == "false")) &&
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
          (!updateanyappliedB() && apply == "false")) &&
        (updateanyselectedB().toString() == select ||
          (!updateanyselectedB() && select == "false"))
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

  // When Owner presses Complete Job the status updates to 'Done' ///////////
  const completeJob = async () => {
    try {
      await updateJob({
        variables: { job_id: _id, newStatus: "Done" },
      });

      dispatch({
        type: UPDATE_JOBS,
        jobs: [
          ...state.jobs.filter((job) => {
            return job.id !== _id;
          }),
          newjobstatus(),
        ],
      });

      idbPromise("jobs", "delete", initialjob());
      idbPromise("jobs", "put", newjobstatus());
    } catch (e) {
      console.error(e);
    }
  };
  // When Owner clicks Delete Job:
  const deleteJobById = async () => {
    try {
      await deleteJob({
        variables: { job_id: _id },
      });

      dispatch({
        type: UPDATE_JOBS,
        jobs: [
          ...state.jobs.filter((job) => {
            return job.id !== _id;
          }),
        ],
      });

      idbPromise("jobs", "delete", initialjob());
    } catch (e) {
      console.error(e);
    }
    window.location.reload(false);
  };

  const options = [
    {
      key: "completed",
      icon: "edit",
      text: "Job Completed",
      value: "completed",
    },
    { key: "delete", icon: "delete", text: "Remove Job Post", value: "delete" },
  ];
  function userMenu(event) {
    // event.onClick(alert('test'));
    // console.log(event.target.value);
    // event.onChange(alert('value'));
    // alert('test')
    if (event.target.value === "completed") {
      completeJob();
    } else if (event.target.value === "delete") {
      deleteJobById();
    }
  }

  // Display the job if it corresponds to the filter criteria coming from react props item
  function filterJob() {
    // Our Jobs Page
    if (
      submit == "any" &&
      apply == "any" &&
      select == "any" &&
      selectme == "any"
    ) {
      return true;
    }

    // My Job History Page
    if (me.type == "Dog Walker") {
      if (!initialwalkerjob()) {
        // never applied to the job
        if (
          apply == "false" &&
          (updateanyselectedB().toString() == select ||
            (!updateanyselectedB() && select == "false")) &&
          selectme == "false"
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
            (!updateanyselectedB() && select == "false")) &&
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
          (!updateanyappliedB() && apply == "false")) &&
        (updateanyselectedB().toString() == select ||
          (!updateanyselectedB() && select == "false"))
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  const test = submitter.ratingAvg;

  // Modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  if (!filterJob()) {
    return null;
    // {(() => setOpen(true), test())}
  }
  return (
    <>
      <Card style={{ margin: "10px 0" }}>
        <Card.Content>
          <Image
            src={submitter.image ? submitter.image : "https://placedog.net/500"}
          />
          <Card.Header>{title}</Card.Header>
          <Link to={`/profile/${submitter._id}`}>
            <Card.Header>{`by ${submitter?.firstName}  ${submitter?.lastName}`}</Card.Header>
          </Link>
          <Rating
            icon="star"
            defaultRating={submitter.ratingAvg}
            maxRating={5}
            disabled={true}
          />
          <Card.Description>{description}</Card.Description>
          <Card.Meta>{date}</Card.Meta>
          <div className="pricecolor">{`Price: $${price}`}</div>
        </Card.Content>

        {Auth.loggedIn() && me.type == "Dog Walker" && (
          <Card.Content extra>
            <div className="ui buttons">
              {(status == "Live" &&
                updateappliedB() == true &&
                updateanyselectedB() == false && (
                  <Button color="red" onClick={withdrawFromJob}>
                    Withdraw
                  </Button>
                )) ||
                (status == "Live" &&
                  updateappliedB() == false &&
                  updateanyselectedB() == false && (
                    <Button color="green" onClick={applyForJob}>
                      Apply
                    </Button>
                  )) ||
                (updateselectedB() == true && (
                  <Button basic color="green" disabled>
                    You are selected!!
                  </Button>
                )) ||
                (updateanyselectedB() == true && updateselectedB() == false && (
                  <Button basic color="green" disabled>
                    Walker selected!!
                  </Button>
                ))}
            </div>
            <div
              className="ui buttons right floated"
              onClick={() => setOpen(true)}
            >
              <Button className="centered" secondary>
                Expand
              </Button>
            </div>
          </Card.Content>
        )}
        {Auth.loggedIn() && me.type == "Dog Owner" && walker == "true" && (
          <Card.Content extra>
            {status == "Live" ? (
              <Button.Group>
                <Button value="delete" onClick={userMenu} negative>
                  Delete
                </Button>
                <Button.Or />
                <Button value="completed" onClick={userMenu} positive>
                  Completed
                </Button>
              </Button.Group>
            ) : null}
            <UserList
              type="Dog Walker"
              apply="true"
              job_id={_id}
              job_price={price}
            />
          </Card.Content>
        )}
      </Card>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
      >
        <h4> Modal body INFO</h4>
        <table>
          <tr>
            <th>
              <Card
                image={image ? image : "https://placedog.net/500"}
                header={title}
                description={description}
              />
            </th>
            <th>
              <h1>Submitter Information</h1>
              <p>Profile Image: {submitter?.image}</p>
              <p>First Name: {submitter?.firstName}</p>
              <p>Last Name: {submitter?.lastName}</p>
              <p>Description: {submitter?.description}</p>
            </th>
          </tr>
        </table>
      </Modal>
    </>
  );
}
export default JobItem;
