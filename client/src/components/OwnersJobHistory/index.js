import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOB_BY_USER_ID } from '../../utils/queries';
import {Dimmer, Loader, Item} from 'semantic-ui-react';
import JobItem from '../JobItem';




function OwnersJobHistory(){
    const state = useSelector(state=>state);
    const {me} = state;

    
    // let data1 = useQuery(QUERY_USER_BYID, {
        //     variables: { id: user_id },
        //   });
        
        // const me = data?.user || {};
        // console.log(me);
        
        const {loading, error, data:jobs} = useQuery(QUERY_JOB_BY_USER_ID, {
            variables: { id: me[0]._id },
        });
        if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}
        // console.log(jobs);
        return(
            <>
                {jobs.jobByUserId.map(job =>(
                    <Item.Group relaxed key={job._id}>
                        <JobItem item = {job} img={me[0].image}/>
                    </Item.Group>
                ))}
            </>
    )
}
export default OwnersJobHistory;