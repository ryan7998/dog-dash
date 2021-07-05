import React, { useEffect, useState } from "react";
import {Dimmer, Loader, Feed, Button, Icon } from "semantic-ui-react";
import {useQuery} from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import {QUERY_USER_BYID} from '../../utils/queries';
import {SELECT_WALKER} from '../../utils/mutations';

function AppliedUsers({id}){
    const {loading, error, data} = useQuery(QUERY_USER_BYID, {
        variables: { id: id }
    });

    function approve(){
        
    }

    function reject(){

    }
    
    if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}

    const {firstName, image, ratingAvg, selectedJobs, userId} = data?.userById;
    console.log(id);
    return(
        <Feed key={userId}>
            <Feed.Event>
                <Feed.Label>
                    <Link to={`/profile/${id}`}><img src={image} /></Link>
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User><Link to={`/profile/${id}`}>{firstName}</Link></Feed.User> completed {selectedJobs.length} jobs with rating: {ratingAvg}
                        {/* <Feed.Date>1 Hour Ago</Feed.Date> */}
                    </Feed.Summary>
                    <Feed.Meta>
                        <Icon name='check' circular color="green" onClick={()=>approve()}/>Approve
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )
}

export default AppliedUsers;