import React, { useEffect, useState } from 'react';
import {Button, Dimmer, Loader} from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import {useSelector, useDispatch} from 'react-redux';
import { QUERY_JOB_BY_STATUS } from "../../utils/queries";


import {
    UPDATE_JOB,
    DELETE_JOB,
} from '../../utils/mutations';
import { QUERY_JOB_BY_USER_ID } from '../../utils/queries';

function OwnerBtn({_id}){
    // console.log(_id);
    const state = useSelector((state)=>state);
    const {me} = state;
    const [updateJob, { loading, error }] = useMutation(UPDATE_JOB);
    const [deleteJob] = useMutation(DELETE_JOB,{
        update(cache, {data: {deleteJob}}){
            try{
                // get cache of jobs by user id:
                const {jobByUserId} = cache.readQuery({query:QUERY_JOB_BY_USER_ID, variables:{ id: me[0]._id }});
                // update cache by removing deleted item:
                cache.writeQuery({
                    query: QUERY_JOB_BY_USER_ID, variables:{ id: me[0]._id },
                    data:  {
                        jobByUserId: jobByUserId.filter(job=>job._id !== deleteJob._id)
                    }
                })
            } catch (e) {
                console.error(e);
            }
        }
    });

    // When Owner clicks Complete Job:
    const completeJob = async () => {
        try{
            await updateJob({
                variables: { job_id: _id, newStatus: 'Completed' },
            });
        } catch (e) {
            console.error(e);
        }
    };

    // When Owner clicks Delete Job:
    const deleteJobById = async () => {
        try{
            // console.log(_id);
            await deleteJob({
                variables: { job_id: _id },
                // instead of manually updating, we can refetch queries like this:
                // refetchQueries: [{query: QUERY_JOB_BY_USER_ID, variables:{ id: me[0]._id }}]
            });
        } catch (e) {
            console.error(e);
        }
    };
    if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}

    return(

        <Button.Group floated='right'>
            <Button onClick={()=>deleteJobById()} negative>
                Delete
            </Button>
            <Button.Or />
            <Button onClick={()=>completeJob()} positive>
                Completed
            </Button>
        </Button.Group>
        
    )
}

export default OwnerBtn;
