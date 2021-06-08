import React, { useEffect, useState } from 'react';
import {Item, Button, Label, Icon, Divider, Dimmer, Loader} from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";

import {
    APPLY_JOB,
    WITHDRAW_JOB,
    UPDATE_JOB,
    DELETE_JOB,
} from '../../utils/mutations';
import { QUERY_JOB_BY_USER_ID } from '../../utils/queries';
import { UPDATE_JOBS } from '../../utils/actions';
import {useSelector, useDispatch} from 'react-redux';
  


function JobItem(props){
    // console.log(props);
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {me} = state;
    const{ appliedUsers, comments, date, description, price, status, title, _id } = props.item;
    // console.log(appliedUsers, comments, date, description, price, status, title, _id);
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
    
    if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}


    const completeJob = async () => {
        try{
            await updateJob({
                variables: { job_id: _id, newStatus: 'Completed' },
            });
        } catch (e) {
            console.error(e);
        }
        // console.log('clicked complete job');
    };

    // When Owner clicks Delete Job:
    const deleteJobById = async () => {
        try{
            await deleteJob({
                variables: { job_id: _id },
            });
        } catch (e) {
            console.error(e);
        }
    };


    return(
        <>
            {loading ? <Dimmer active> <Loader content='Loading' /></Dimmer> : null}
            <Item>
                <Item.Image size='small' src={props.img} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>{title}</Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Meta>
                        <Label> <Icon name="time" /> {date}</Label>
                        <Label> ${price}</Label>
                        <Label> <Icon name="user circle outline" /> Total Applications: {appliedUsers.length}</Label>
                    </Item.Meta>
                    <Item.Extra>
                        <div>{appliedUsers}</div>
                        <Button.Group floated='right'>
                            <Button onClick={()=>deleteJobById()} negative>
                                Delete
                            </Button>
                            <Button.Or />
                            <Button onClick={()=>completeJob()} positive>
                                Completed
                            </Button>
                        </Button.Group>
                    </Item.Extra>
                </Item.Content>
            </Item>
            <Divider clearing />
        </>
    )
}
export default JobItem;
