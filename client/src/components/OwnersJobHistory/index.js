import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOB_BY_USER_ID } from '../../utils/queries';
import {Dimmer, Loader, Item} from 'semantic-ui-react';
import JobItem from '../JobItem';
import { UPDATE_JOBS } from '../../utils/actions';



function OwnersJobHistory(){
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {me} = state;
    const {loading, error, data:jobs} = useQuery(QUERY_JOB_BY_USER_ID, {
        variables: { id: me[0]._id },
    });

    // useEffect(() => {
    //     if (jobs) {
    //     //   dispatch({
    //     //     type: UPDATE_JOBS,
    //     //     jobs: jobs.jobByUserId,
    //     //   });
    //     //   jobs.jobs.forEach((job) => {
    //     //     // idbPromise("jobs", "put", job);
    //     //   });
    //     } else if (!loading) {
    //       // idbPromise("jobs", "get").then((jobs) => {
    //       //   dispatch({
    //       //     type: UPDATE_JOBS,
    //       //     jobs: jobs,
    //       //   });
    //       // });
    //     }
    //   }, [jobs]);
    if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}

    return(
        <>
            <h2>Open Jobs</h2>
            {jobs.jobByUserId.filter(job=>job.status === 'Live').map(job =>(
                <Item.Group relaxed key={job._id}>
                    <JobItem item = {job} img={me[0].image}/>
                </Item.Group>
            ))}
            {/* Closed Jobs: */}
            <h2>Closed Jobs</h2>
            {jobs.jobByUserId.filter(job=>job.status !== 'Live').map(job =>(
                <Item.Group relaxed key={job._id}>
                    <JobItem item = {job} img={me[0].image}/>
                </Item.Group>
            ))}
        </>
    )
}
export default OwnersJobHistory;