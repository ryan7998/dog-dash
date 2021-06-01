import React, { useEffect, useState } from 'react';
import {Item, Button, Label, Icon, Divider, Dimmer, Loader} from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import {
    APPLY_JOB,
    WITHDRAW_JOB,
    UPDATE_JOB,
    DELETE_JOB,
} from '../../utils/mutations';
import { UPDATE_JOBS } from '../../utils/actions';
import {useSelector, useDispatch} from 'react-redux';
  


function JobItem(props){
    // console.log(props);
    const{ appliedUsers, comments, date, description, price, status, title, _id } = props.item;
    // console.log(appliedUsers, comments, date, description, price, status, title, _id);
    const [updateJob, { loading, error }] = useMutation(UPDATE_JOB);
    const [deleteJob] = useMutation(DELETE_JOB);
    const dispatch = useDispatch();
    const state = useSelector(state=>state);

    if(loading){return null}

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
            const deletedJob = await deleteJob({
                variables: { job_id: _id },
            });
            dispatch({
                type: UPDATE_JOBS,
                jobs: [
                  ...state.jobs.filter((job) => {
                    return job.id !== deletedJob._id;
                  }),
                ],
            });    
            console.log(deletedJob);
        } catch (e) {
            console.error(e);
        }
    // window.location.reload(false);
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
