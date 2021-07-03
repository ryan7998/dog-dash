import React, { useEffect, useState } from 'react';
import {Item, Button, Label, Icon, Divider, Dimmer, Loader} from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import OwnerBtn from '../OwnersBtn';

import {useSelector, useDispatch} from 'react-redux';


function JobItem(props){
    // console.log(props);
    const state = useSelector((state)=>state);
    const {me} = state;

    const{ appliedUsers, comments, date, description, price, status, title, _id, user } = props.item;

    return(
        <>
            <Item>
                <Item.Image size='small' src={props.img} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>{title}</Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Meta>
                        <Label> <Icon name="time" /> {date}</Label>
                        <Label> ${price}</Label>
                        <Label> <Icon name="user circle outline" /> Total Applications: {appliedUsers?.length}</Label>
                    </Item.Meta>

                    <Item.Extra>
                        <div>{appliedUsers}</div>
                        {props.type === 'owner' &&
                            <OwnerBtn _id/>
                        }
                    </Item.Extra>
                </Item.Content>
            </Item>
            <Divider clearing />
        </>
    )
}
export default JobItem;
